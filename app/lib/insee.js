// INSEE API - SIRET Validation

const INSEE_API_URL = 'https://api.insee.fr/entreprises/sirene/V3.11';

export async function validateSiret(siret) {
    const apiKey = process.env.INSEE_API_KEY;

    if (!apiKey) {
        console.warn('INSEE API key not configured');
        return { valid: true, warn: 'SIRET not verified - API key missing' };
    }

    // Basic format validation
    const cleanSiret = siret.replace(/\s/g, '');
    if (!/^\d{14}$/.test(cleanSiret)) {
        return { valid: false, error: 'Le SIRET doit contenir 14 chiffres' };
    }

    // Luhn checksum validation
    if (!validateLuhn(cleanSiret)) {
        return { valid: false, error: 'SIRET invalide (checksum incorrecte)' };
    }

    try {
        const response = await fetch(`${INSEE_API_URL}/siret/${cleanSiret}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
            },
        });

        if (response.status === 404) {
            return { valid: false, error: 'Établissement non trouvé dans la base SIRENE' };
        }

        if (response.status === 401 || response.status === 403) {
            console.error('INSEE API auth error');
            return { valid: true, warn: 'SIRET non vérifié - erreur API' };
        }

        if (!response.ok) {
            console.error('INSEE API error:', response.status);
            return { valid: true, warn: 'SIRET non vérifié - erreur API' };
        }

        const data = await response.json();
        const etablissement = data.etablissement;

        if (!etablissement) {
            return { valid: false, error: 'Établissement non trouvé' };
        }

        // Check if establishment is still active
        const periodes = etablissement.periodesEtablissement || [];
        const currentPeriod = periodes.find(p => !p.dateFin);

        if (currentPeriod && currentPeriod.etatAdministratifEtablissement === 'F') {
            return { valid: false, error: 'Cet établissement est fermé' };
        }

        // Get company name
        const uniteLegale = etablissement.uniteLegale || {};
        const companyName = uniteLegale.denominationUniteLegale ||
            `${uniteLegale.prenomUsuelUniteLegale || ''} ${uniteLegale.nomUniteLegale || ''}`.trim() ||
            'Entreprise';

        const address = etablissement.adresseEtablissement || {};
        const fullAddress = [
            address.numeroVoieEtablissement,
            address.typeVoieEtablissement,
            address.libelleVoieEtablissement,
            address.codePostalEtablissement,
            address.libelleCommuneEtablissement
        ].filter(Boolean).join(' ');

        return {
            valid: true,
            company: companyName,
            address: fullAddress,
            siren: cleanSiret.substring(0, 9),
            nic: cleanSiret.substring(9),
            active: true,
        };
    } catch (error) {
        console.error('SIRET validation error:', error);
        return { valid: true, warn: 'SIRET non vérifié - erreur réseau' };
    }
}

// Luhn algorithm for SIRET/SIREN validation
function validateLuhn(siret) {
    let sum = 0;
    for (let i = 0; i < siret.length; i++) {
        let digit = parseInt(siret[i], 10);
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

// Quick SIREN validation (first 9 digits)
export function validateSiren(siren) {
    const cleanSiren = siren.replace(/\s/g, '');
    if (!/^\d{9}$/.test(cleanSiren)) {
        return false;
    }
    return validateLuhn(cleanSiren);
}

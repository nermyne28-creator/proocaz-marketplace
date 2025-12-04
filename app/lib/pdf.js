import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Génère un PDF de facture
 * @param {Object} transaction - Données de la transaction
 * @param {Object} listing - Données de l'annonce
 * @param {Object} buyer - Données de l'acheteur
 * @param {Object} seller - Données du vendeur
 * @returns {Buffer} Buffer du PDF généré
 */
export function generateInvoicePDF(transaction, listing, buyer, seller) {
  const doc = new jsPDF();

  // En-tête avec logo (texte pour le moment)
  doc.setFontSize(24);
  doc.setTextColor(0, 46, 93); // Bleu OccaSync
  doc.text('OccaSync', 20, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Marketplace B2B d\'occasion', 20, 27);

  // Titre Facture
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('FACTURE', 150, 20);

  // Numéro et date
  doc.setFontSize(10);
  doc.text(`N° ${transaction.invoiceNumber}`, 150, 30);
  doc.text(`Date: ${new Date(transaction.createdAt).toLocaleDateString('fr-FR')}`, 150, 37);

  // Ligne de séparation
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 45, 190, 45);

  // Informations Vendeur
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Vendeur', 20, 55);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(seller.company || 'N/A', 20, 62);
  if (seller.siret) {
    doc.text(`SIRET: ${seller.siret}`, 20, 68);
  }
  doc.text(seller.email, 20, 74);

  // Informations Acheteur
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Acheteur', 120, 55);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(buyer.company || 'N/A', 120, 62);
  if (buyer.siret) {
    doc.text(`SIRET: ${buyer.siret}`, 120, 68);
  }
  doc.text(buyer.email, 120, 74);

  // Ligne de séparation
  doc.line(20, 85, 190, 85);

  // Tableau des articles
  const tableData = [
    [
      listing.title,
      listing.category,
      listing.condition,
      '1',
      `${transaction.amount.toFixed(2)} €`,
      `${transaction.amount.toFixed(2)} €`,
    ],
  ];

  doc.autoTable({
    startY: 95,
    head: [['Description', 'Catégorie', 'État', 'Qté', 'Prix Unit. HT', 'Total HT']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [0, 46, 93], // Bleu OccaSync
      textColor: 255,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 9,
    },
  });

  const finalY = doc.lastAutoTable.finalY || 150;

  // Totaux
  const totalHT = transaction.amount;
  const tva = totalHT * 0.2;
  const totalTTC = totalHT + tva;

  doc.setFontSize(10);
  doc.text('Total HT:', 130, finalY + 15);
  doc.text(`${totalHT.toFixed(2)} €`, 170, finalY + 15, { align: 'right' });

  doc.text('TVA (20%):', 130, finalY + 22);
  doc.text(`${tva.toFixed(2)} €`, 170, finalY + 22, { align: 'right' });

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Total TTC:', 130, finalY + 32);
  doc.text(`${totalTTC.toFixed(2)} €`, 170, finalY + 32, { align: 'right' });

  // Footer
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(
    'OccaSync - Marketplace B2B d\'occasion | contact@occasync.com | www.occasync.com',
    105,
    280,
    { align: 'center' }
  );

  return doc.output('arraybuffer');
}

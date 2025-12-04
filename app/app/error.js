"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Erreur</p>
        <h1 className="text-3xl font-semibold">Une erreur est survenue</h1>
        <p className="text-muted-foreground text-sm">
          {error?.message || 'Veuillez réessayer ultérieurement.'}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

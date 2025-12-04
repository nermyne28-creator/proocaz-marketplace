export const metadata = {
  title: 'Page non trouvee',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold">Page non trouvée</h1>
        <p className="text-muted-foreground">La ressource demandée n’existe pas.</p>
      </div>
    </div>
  );
}

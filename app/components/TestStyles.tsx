export default function TestStyles() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-heading text-earth-brown mb-4">
        Prueba de Estilos Tailwind
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-olive-green text-warm-sand rounded-lg">
          <h2 className="text-2xl font-heading mb-2">Color Olive Green</h2>
          <p className="font-sans">Este es un texto de prueba con la fuente sans.</p>
        </div>
        <div className="p-4 bg-terracotta text-warm-sand rounded-lg">
          <h2 className="text-2xl font-heading mb-2">Color Terracotta</h2>
          <p className="font-sans">Este es un texto de prueba con la fuente sans.</p>
        </div>
      </div>
    </div>
  );
} 
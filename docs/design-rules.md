# Reglas de Diseño y Next.js

## Estructura de Archivos y Componentes

### Server Components vs Client Components
- Por defecto, todos los componentes son Server Components
- Usar 'use client' solo cuando sea necesario:
  - Interactividad (eventos, hooks)
  - APIs del navegador
  - Componentes con estado
  - Efectos secundarios

```tsx
// Server Component (por defecto)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component (cuando es necesario)
'use client';
export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <div onClick={() => setState()}>{state}</div>;
}
```

### Layouts y Templates
- Usar `layout.tsx` para UI compartida entre rutas
- Usar `template.tsx` para UI que necesita recrearse en cada navegación
- Mantener el navbar en el layout raíz

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 pt-[120px] pb-8">
          {children}
        </main>
      </body>
    </html>
  );
}
```

## Espaciado y Márgenes

### Márgenes de Página
- Todas las páginas deben tener un padding-top de 150px para respetar el navbar fijo
- El padding-bottom debe ser de 32px (pb-8)
- El padding horizontal debe ser de 16px (px-4)
- El contenedor debe estar centrado (container mx-auto)

```tsx
// Ejemplo de estructura base para todas las páginas
export default async function Page() {
  const data = await fetchData();
  return (
    <div className="container mx-auto px-4 pt-[150px] pb-8">
      {/* Contenido de la página */}
    </div>
  );
}
```

### Espaciado entre Secciones
- Entre secciones principales: 64px (my-16)
- Entre elementos relacionados: 32px (my-8)
- Entre elementos dentro de una sección: 16px (my-4)

### Márgenes de Componentes
- Los componentes deben mantener un espaciado consistente con su contenedor
- Los componentes que son hijos directos de una página deben respetar el padding-top de 150px
- Los componentes anidados deben mantener el espaciado relativo a su contenedor padre

### Responsive Design
- En móviles (sm): padding horizontal de 8px (px-2)
- En tablets (md): padding horizontal de 16px (px-4)
- En desktop (lg): padding horizontal de 24px (px-6)

## ⚠️ Advertencias Importantes

### Funciones Asíncronas
- **NO** eliminar las funciones asíncronas (`async`) de los componentes que interactúan con la base de datos
- Las funciones asíncronas son necesarias para:
  - Conexión con la base de datos
  - Fetching de datos
  - Operaciones que requieren esperar una respuesta
- Ejemplo correcto:
```tsx
export default async function Page() {
  const data = await prisma.templo.findMany();
  return (
    <div className="container mx-auto px-4 pt-[150px] pb-8">
      {/* Contenido */}
    </div>
  );
}
```

### Metadata y SEO
- Usar `generateMetadata` para metadata dinámica
- Usar `metadata` export para metadata estática
- Incluir metadata básica en todas las páginas

```tsx
// Metadata estática
export const metadata = {
  title: 'Página | Templo de Tierra',
  description: 'Descripción de la página',
};

// Metadata dinámica
export async function generateMetadata({ params }) {
  const data = await fetchData(params.id);
  return {
    title: data.title,
    description: data.description,
  };
}
```

## Implementación

Estas reglas deben ser aplicadas consistentemente en todo el proyecto. Para mantener la consistencia:

1. Usar las clases de Tailwind definidas
2. Evitar valores personalizados de padding/margin a menos que sea absolutamente necesario
3. Documentar cualquier excepción a estas reglas
4. Revisar periódicamente el código para mantener la consistencia
5. **NUNCA** eliminar las funciones asíncronas de los componentes que interactúan con la base de datos
6. Seguir las mejores prácticas de Next.js para Server y Client Components

## Ejemplos de Uso

### Página Estándar con Metadata
```tsx
export const metadata = {
  title: 'Página | Templo de Tierra',
  description: 'Descripción de la página',
};

export default async function Page() {
  const data = await fetchData();
  return (
    <div className="container mx-auto px-4 pt-[150px] pb-8">
      <h1 className="text-3xl font-heading text-[#6F4C21] mb-8">Título</h1>
      <div className="space-y-8">
        {/* Contenido */}
      </div>
    </div>
  );
}
```

### Componente Interactivo (Client Component)
```tsx
'use client';

export default function InteractiveComponent() {
  const [state, setState] = useState();
  return (
    <div className="space-y-16">
      <section className="space-y-8">
        {/* Contenido interactivo */}
      </section>
    </div>
  );
}
```

## Navbar Fijo

### Regla Principal
Todas las páginas y componentes deben tener en cuenta la presencia del navbar fijo de 120px de altura.

### Implementación

1. **Estructura Base de Páginas**
   ```tsx
   <main className="pt-[120px]">
     {/* Contenido de la página */}
   </main>
   ```

2. **Elementos con Posicionamiento Absoluto**
   ```tsx
   <div className="absolute top-[120px] left-0">
     {/* Contenido posicionado absolutamente */}
   </div>
   ```

3. **Elementos con Posicionamiento Fijo**
   ```tsx
   <div className="fixed top-[120px] left-0">
     {/* Contenido posicionado fijamente */}
   </div>
   ```

### Consideraciones Especiales

1. **Modales y Overlays**
   - Deben tener un z-index mayor que el navbar
   - Deben considerar el espacio del navbar en su posicionamiento

2. **Scroll y Anclas**
   - Los enlaces de anclaje deben compensar la altura del navbar
   - El scroll suave debe tener en cuenta el offset del navbar

3. **Responsive Design**
   - En móviles, el navbar puede cambiar de altura
   - Asegurar que el padding-top se ajuste según el breakpoint

### Ejemplos de Implementación

1. **Página con Secciones**
   ```tsx
   <main className="pt-[120px]">
     <section id="seccion1" className="scroll-mt-[120px]">
       {/* Contenido */}
     </section>
   </main>
   ```

2. **Modal**
   ```tsx
   <div className="fixed inset-0 z-50 pt-[120px]">
     {/* Contenido del modal */}
   </div>
   ```

3. **Componente con Posicionamiento Absoluto**
   ```tsx
   <div className="relative">
     <div className="absolute top-[120px] left-0">
       {/* Contenido */}
     </div>
   </div>
   ```

### Verificación

Antes de implementar cualquier nuevo componente o página, verificar:
1. ¿El contenido respeta el espacio del navbar?
2. ¿Los elementos posicionados absolutamente o fijamente consideran el offset?
3. ¿El z-index es apropiado en relación con el navbar?
4. ¿La implementación es responsive y considera diferentes alturas de navbar? 
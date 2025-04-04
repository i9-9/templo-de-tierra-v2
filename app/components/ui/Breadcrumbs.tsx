import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
      <ol className="flex flex-wrap items-center text-sm text-[#6F4C21]/70">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="hover:text-[#6F4C21] transition-colors hover:underline"
          >
            Inicio
          </Link>
          <span className="mx-2">/</span>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="font-medium text-[#6F4C21]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link 
                    href={item.href || '#'} 
                    className="hover:text-[#6F4C21] transition-colors hover:underline"
                  >
                    {item.label}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      
      {/* Schema.org Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Inicio',
                'item': 'https://templodetierraarg.com/'
              },
              ...items.map((item, index) => ({
                '@type': 'ListItem',
                'position': index + 2,
                'name': item.label,
                'item': item.href ? `https://templodetierraarg.com${item.href}` : undefined
              }))
            ]
          })
        }}
      />
    </nav>
  );
} 
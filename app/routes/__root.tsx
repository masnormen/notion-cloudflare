import { themeAtom } from '@/atoms/index';
import { SVGFilters } from '@/components/filters/svg-filters';
import { CustomErrorComponent } from '@/components/layouts/error';
import { Navbar } from '@/components/layouts/navbar';
import { NotFoundComponent } from '@/components/layouts/not-found';
import appCss from '@/styles/app.css?url';
import gfmCss from '@/styles/gfm.css?url';
import shikiCss from '@/styles/shiki.css?url';
import { normalizeCssUrl } from '@/utils/normalize-css-url';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CatchBoundary, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Meta, Scripts } from '@tanstack/start';
import { useAtomValue } from 'jotai';
import { type ReactNode, useEffect } from 'react';
import { Toaster } from 'sonner';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'robots',
        content: 'index,follow',
      },
      {
        rel: 'canonical',
        href: 'https://nourman.com/',
      },
      {
        title: 'Nourman Hajar • Software Engineer',
      },
      {
        name: 'description',
        content:
          'A blog on software engineering, web development, and miscellaneous tech stuff, by Nourman Hajar.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'og:title',
        content: 'Nourman Hajar • Software Engineer',
      },
      {
        property: 'og:description',
        content:
          'A blog on software engineering, web development, and miscellaneous tech stuff, by Nourman Hajar.',
      },
      {
        property: 'og:url',
        content: 'https://nourman.com/',
      },
      {
        property: 'og:image',
        content: 'https://nourman.com/api/site.png',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:site_name',
        content: 'Nourman Hajar • Software Engineer',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: normalizeCssUrl(appCss),
        suppressHydrationWarning: true,
      },
      {
        rel: 'stylesheet',
        href: normalizeCssUrl(gfmCss),
        suppressHydrationWarning: true,
      },
      {
        rel: 'stylesheet',
        href: normalizeCssUrl(shikiCss),
        suppressHydrationWarning: true,
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      { rel: 'icon', href: '/favicon.png' },
      ...(import.meta.env.VITE_GA_ID || import.meta.env.VITE_GTM_ID
        ? [{ rel: 'preconnect', href: 'https://www.googletagmanager.com' }]
        : []),
    ],
    scripts: [
      ...(import.meta.env.VITE_GA_ID
        ? [
            {
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`,
            },
            {
              children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${import.meta.env.VITE_GA_ID}');`,
            },
          ]
        : []),

      ...(import.meta.env.VITE_GTM_ID
        ? [
            {
              children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${import.meta.env.VITE_GTM_ID}');`,
            },
          ]
        : []),
    ],
  }),
  component: RootComponent,
  errorComponent: CustomErrorComponent,
  notFoundComponent: NotFoundComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!document.documentElement.classList.contains('theme-transitioning')) {
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(() => {
        document.documentElement.removeAttribute('class');
      }, 1000);
    }
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <RootDocument>
      <CatchBoundary getResetKey={() => 'reset'}>
        <QueryClientProvider client={queryClient}>
          <Navbar />

          <Outlet />

          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          {import.meta.env.DEV && (
            <TanStackRouterDevtools initialIsOpen={false} />
          )}
          <Toaster position="top-center" />
          <SVGFilters />
        </QueryClientProvider>
      </CatchBoundary>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <div id="_top_" className="w-0 h-0 invisible" />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import * as elements from 'typed-html';

export const Layout = ({ children }: elements.Attributes) => {
  return (
    <html>
      <head>
        <title>Crafty Reads</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          src="https://unpkg.com/htmx.org@2.0.1"
          integrity="sha384-QWGpdj554B4ETpJJC9z+ZHJcA/i59TyjxEPXiiUgN2WmTyV5OEZWCD6gQhgkdpB/"
          crossorigin="anonymous"
        ></script>
        <script src="//unpkg.com/alpinejs" defer=""></script>
      </head>
      <body>
        <main class="container mx-auto px-4 py-8">{children}</main>
        <div
          aria-live="assertive"
          class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <div
              id="toast-container"
              x-transition:enter="transform ease-out duration-300 transition"
              x-transition:enter-start="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              x-transition:enter-end="translate-y-0 opacity-100 sm:translate-x-0"
              x-transition:leave="transition ease-in duration-100"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0"
            ></div>
          </div>
        </div>
      </body>
    </html>
  );
};

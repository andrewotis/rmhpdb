<!DOCTYPE html>
<html>
    <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @viteReactRefresh
    @vite([
        'resources/sass/app.scss',
        'resources/js/app.jsx',
        ])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
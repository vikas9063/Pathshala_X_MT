import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./layouts/tenant-layout.tsx", [
        // Normal pages inside tenant
        layout("./layouts/normal-layout.tsx", [
            index("./routes/home.tsx"),
            route("login", "./routes/auth/login.tsx"),
            //   route("about", "./routes/about.tsx"),
            //   route("contact", "./routes/contact.tsx"),
        ]),

        // Account pages inside tenant
        layout("./layouts/account-layout.tsx", [
            route(":userName/dashboard", "./routes/accounts/dashboard/dashboard.tsx"),
            route(":userName/account", "./routes/accounts/profile/profile.tsx"),


            // Settings Routes
            route(":userName/settings/pathshala", "./routes/accounts/settings/pathshala-settings.tsx"),
        ]),
        // Catch all 404 inside tenant
        route("*", "./routes/error/error-page.tsx"),
    ]),
] satisfies RouteConfig;

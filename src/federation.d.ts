declare module "shell/global" {
  export type AppKey = "app1" | "app2";
  export type AppsState = {
    app1: { name: string; bgColor: string };
    app2: { name: string; bgColor: string };
  };

  export const getAppsState: () => AppsState;
  export const subscribeGlobal: (fn: () => void) => () => void;
  export const updateAppName: (key: AppKey, name: string) => void;
  export const updateAppBgColor: (key: AppKey, bgColor: string) => void;
}

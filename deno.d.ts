declare module "openapi-typescript-codegen" {
  export interface GenerateOptions {
    input: string;
    output: string;
    clientName?: string;
    httpClient?: string;
    useUnionTypes?: boolean;
    useOptions?: boolean;
  }

  export function generate(options: GenerateOptions): Promise<void>;
} 
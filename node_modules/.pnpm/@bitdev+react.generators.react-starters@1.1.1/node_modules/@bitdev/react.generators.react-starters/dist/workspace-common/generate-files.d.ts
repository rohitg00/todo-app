import { WorkspaceContext } from '@teambit/generator';
type GeneratedFile = {
    relativePath: string;
    content: string;
};
export declare function generateFiles(context: WorkspaceContext, extraConfig?: Record<string, any>, additionalEnvs?: string[]): Promise<GeneratedFile[]>;
export {};

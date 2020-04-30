declare module 'react-git-info/macro' {

  export interface GitInformation {
    readonly tags: string[];
    readonly branch: string;
    readonly commit: {
      readonly date: string;
      readonly hash: string;
      readonly message: string;
      readonly shortHash: string;
    };
  }

  export default function GitInfo(): GitInformation;
}

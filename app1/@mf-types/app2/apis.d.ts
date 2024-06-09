
    export type RemoteKeys = 'app2/Hello';
    type PackageType<T> = T extends 'app2/Hello' ? typeof import('app2/Hello') :any;
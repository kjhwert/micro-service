
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/Hello';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/Hello' ? typeof import('REMOTE_ALIAS_IDENTIFIER/Hello') :any;
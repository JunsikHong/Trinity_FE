export const USER_ROLES = {
    VIEWER: 'VIEWER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
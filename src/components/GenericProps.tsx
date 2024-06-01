import { UserSession } from "../ApiTypes"

export interface GenericProps<T> {
    session: UserSession
    elems: T[]
}

export interface GenericModalProps<T> {
    onClose: () => void
    onAdd: (elem: T) => void
}

export interface GenericTabProps<T> {
    elems: T[]
    onAdd: () => void
    onDelete: (elemId: Number) => void
}


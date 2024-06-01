import { UserSession } from "../ApiTypes"

export interface GenericProps<T> {
    session: UserSession
    elems: T[]
}

//@Todo Be more precise after implementation is finished
export interface GenericModalProps<T> {
    initElem?: T
    onClose: () => void                 // Close the modal
    onPost: (elem: T) => void           // Post -> API
    onPut: (elem: T) => void           // Put -> API
}

export interface GenericTabProps<T> {
    elems: T[]
    onAdd: () => void                   // Shows Modal
    onEdit?: (e: T) => void             // Show Modal with set fields
    onDelete: (elemId: Number) => void  // Delete -> API
}


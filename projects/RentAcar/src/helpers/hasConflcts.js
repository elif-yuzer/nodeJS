export function hasConflicts (existing,requested){

    return (
        existing.start < requested.end && existing.end > requested.start
    )
}
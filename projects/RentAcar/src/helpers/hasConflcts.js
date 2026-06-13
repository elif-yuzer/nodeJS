function hasConflicts(existing, requested) {
  return (
    existing.startDate <= requested.endDate && 
    existing.endDate >= requested.startDate
  );
}

module.exports = hasConflicts;
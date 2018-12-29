export const adjustMarkerLabels: (markers: MapglMarker[]) => void = markers => {
  const ys: number[] = markers.map(marker => marker._pos.y);
  const mapMarkersToGroups = {};
  const groups: MapglMarker[][] = [];
  ys.forEach((y, i) => {
    const currentGroup: MapglMarker[] = mapMarkersToGroups[i] || [markers[i]];
    for (let j = i; j < ys.length; j++) {
      if (Math.abs(y - ys[j]) < 2 && currentGroup.indexOf(markers[j]) === -1) {
        currentGroup.push(markers[j]);
        mapMarkersToGroups[j] = currentGroup;
      }
    }
    if (currentGroup.length > 1) {
      mapMarkersToGroups[i] = currentGroup;
      if (groups.indexOf(currentGroup) === -1) {
        groups.push(currentGroup);
      }
    }
  });
  console.log(
    groups.map(group =>
      group.map(
        marker =>
          `${marker._element.innerText} ${marker._pos.x},${marker._pos.y}`
      )
    )
  );
  groups.forEach(group => {
    const xRange = group.reduce(
      (acc, marker) => [
        Math.min(marker._pos.x, acc[0]),
        Math.max(marker._pos.x, acc[1])
      ],
      [Infinity, -Infinity]
    );
    const middleX = (xRange[0] + xRange[1]) / 2;
    group.forEach(marker => {
        if (marker._pos.x < middleX) {
            marker._element.classList.add("marker--left");
        }
    })
  });
};

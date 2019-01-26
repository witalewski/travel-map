import * as React from "react";
import { connect } from "react-redux";

import { next, prev } from "./state/actions";
import { MediaContent } from "./components/MediaContent";
import { MapContent } from "./components/MapContent";

interface AppParams {
  destinations: Destination[];
  currentDestinationIndex: number;
  currentMedia: string;
  displayMedia: boolean;
  next: () => void;
  prev: () => void;
}

export const App = ({
  destinations,
  currentDestinationIndex,
  currentMedia,
  displayMedia,
  next,
  prev
}) => {
  const onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void = event => {
    const { key } = event;
    if (key === "Space" || key === "ArrowRight") {
      next();
    } else if (key === "ArrowLeft") {
      prev();
    }
  };

  const onContextMenu = event => {
    event.preventDefault();
    prev();
  };

  return (
    <main
      onKeyUp={onKeyUp}
      onClick={next}
      onContextMenu={onContextMenu}
      className="main"
    >
      <MapContent
        destinations={destinations}
        currentDestinationIndex={currentDestinationIndex}
      />
      {displayMedia && <MediaContent media={currentMedia} />}
    </main>
  );
};

const mapStateToProps = state => ({
  destinations: state.destinations,
  currentDestinationIndex: state.currentDestinationIndex,
  currentMedia: state.currentMedia,
  displayMedia: state.displayMedia
});
const mapDispatchToProps = {
  next,
  prev
};

export const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

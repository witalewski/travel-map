import * as React from "react";
import { connect } from "react-redux";

import { showNextSlide, showPreviousSlide } from "./state/actions";
import { MediaContent } from "./components/MediaContent";
import { MapContent } from "./components/MapContent";

interface AppParams {
  destinations: Destination[];
  currentDestinationIndex: number;
  currentMedia: string;
  displayMedia: boolean;
  showNextSlide: () => void;
  showPreviousSlide: () => void;
}

export const App = ({
  destinations,
  currentDestinationIndex,
  currentMedia,
  displayMedia,
  showNextSlide,
  showPreviousSlide,
}: AppParams) => {
  const onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void = (
    event
  ) => {
    const { key } = event;
    switch (key) {
      case " ":
      case "Space":
      case "ArrowRight":
        showNextSlide();
        break;
      case "ArrowLeft":
        showPreviousSlide();
        break;
    }
  };

  const onRightClick = (event) => {
    event.preventDefault();
    showPreviousSlide();
  };

  return (
    <main
      onKeyUp={onKeyUp}
      onClick={showNextSlide}
      onContextMenu={onRightClick}
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

const mapStateToProps = (state) => ({
  destinations: state.destinations,
  currentDestinationIndex: state.currentDestinationIndex,
  currentMedia: state.currentMedia,
  displayMedia: state.displayMedia,
});
const mapDispatchToProps = {
  showNextSlide: showNextSlide,
  showPreviousSlide: showPreviousSlide,
};

export const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

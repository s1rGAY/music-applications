import { useState } from 'react';
import LiveSearch from '../components/live-search/search-component';
import ItemInformation from '../components/ui-elements/info';
import ApplicationModal from '../components/ui-elements/modal';
import { Strategy } from '../services/parsing-strategy';

export function SearchWebPage() {
  const [modal, setModal] = useState(false);
  const [focusedItem, setFocusedItem] = useState({ label: 'none' });

  const urlToLogin = 'http://localhost:4200/api/login';

  function onUnlockButtonClick() {
    window.open(urlToLogin, '_blank');
  }

  function callbackOnInstanceClick(instance) {
    console.log(instance);
    setFocusedItem(instance);
    setModal(true);
  }

  // add default value later
  const selectorParamsArray = [
    { value: 'track', name: 'Tracks' },
    { value: 'artist', name: 'Artists' },
    { value: 'playlist', name: 'Playlists' },
    { value: 'album', name: 'Albums' },
  ];

  return (
    <div className="search-web-page-wrapper">
      <div className="search-web-page-title">
        <p>Type to search from web...</p>
      </div>
      <div className="search-web-conn-block">
        <button className="receive-token-btn" onClick={onUnlockButtonClick}>
          Click to receive authenticity token from Spotify
        </button>
      </div>
      <LiveSearch
        isInputDisabled={false}
        selectorParamsArray={selectorParamsArray}
        instanceClickCallback={callbackOnInstanceClick}
        isSelectorDefaultValueDisabled={true}
        defaultSelectorValue=""
        searchWordInitialState=""
        endpointUrl="http://localhost:4200/api/web-search?"
        parsingStrategy={Strategy.ParseWebSpotifyObj}
      ></LiveSearch>
      <ApplicationModal visible={modal} setVisible={setModal}>
        <ItemInformation item={focusedItem}></ItemInformation>
      </ApplicationModal>
    </div>
  );
}

export default SearchWebPage;

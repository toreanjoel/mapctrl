// ###########################
// START: INIT APPLICATION
// ###########################
(() => {
  loading(true);
  document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
    } else {
      init();
      loading(false);
    }
  };
})()

/**
 * Init the data of the application
 */
function init() {
  // populate dom data
  const currentMatches = getMatches(UPCOMING);
  setUpComingMatches(currentMatches);
  addDomEvents(UPCOMING);
}

// ###########################
// END: INIT APPLICATION
// ###########################

// *****

// ###########################
// START: LOADER
// ###########################

/**
 * The laoding indicator function
 * @param {boolean} isLoading isLoading toggle 
 */
function loading(isLoading) {
  const loader = document.querySelector(`.${DOM.LOADER_WRAPPER}`);
  if (isLoading) {
    loader.style.visibility = 'visible';
  } else {
    loader.style.visibility = 'hidden';
  }
}

// ###########################
// END: LOADER
// ###########################

// *****

// ###########################
// START: MATCH INFO
// ###########################

/**
 * get the upcoming data and render to the dom
 * @param {array} data list of data 
 * @returns array of ordered items
 */
 function getMatches(data) {
  // get and sort by date
  return sortKeys(data)
}

/**
 * Updates the match info dom element data
 */
 function updateMatchInfo() {
  const matchesElms = document.querySelectorAll(`.${DOM.UPCOMING_MATCH_INFO}`) || [];
  if (!matchesElms || !matchesElms.length) return;
  for (let i = matchesElms.length - 1; i >= 0; i--) {
    if (matchesElms[i].classList.contains(DOM.UPCOMING_MATCH_INFO_SELECTED)) {
      return matchesElms[i].getAttribute('data-id');
    }
  }
}

/**
 * Set the active match to be displayed by default
 * @param {} currentMatch the match to use as current - optional will use first
 */
function setActiveMatch(currentMatch) {
  let selectedMatch;
  const matchesElms = document.querySelectorAll(`.${DOM.UPCOMING_MATCH_INFO}`) || [];
  const selectedClass = DOM.UPCOMING_MATCH_INFO_SELECTED;
  // check if user selected
  if (currentMatch && currentMatch.id) {
    selectedMatch = document.querySelector(`.upcoming-group-${currentMatch.id}`);
  } else {
      // get first item in list
    selectedMatch = matchesElms[0];
  }

  if (!selectedMatch) return console.error(TEXT.NO_ELEMENT_FOUND);
  // wait for response from server or set this back
  //remove prev instance of class
  matchesElms.forEach(matchElm => matchElm.classList.remove(selectedClass))
  // add class to selected
  selectedMatch.classList.add(selectedClass);
}

/**
 * Set the main info view dom data with the selected data
 */
function setLiveMainViewInfo(currentMatch) {
  const parentDomElm = document.querySelector(`.${DOM.CURRENT_MATCH}`)
  // add to dom the updates
  parentDomElm.innerHTML = `
    <div class="match_vs">
      <div class="team_logo team_logo_1">
        <img src="${currentMatch.team1.logo}" alt="${currentMatch.team1.name} logo" class="team_logo--img team_logo_team_one" />
      </div>
      <div class="teams">
        <div class="team_names">
          <div class="team_names_team_1"><span class="team_name--team_prefix">Team</span><br /><span class="team_name--team_1_pallet">${currentMatch.team1.name}</span></div>
          <div class="team_names_team_vs">vs</div>
          <div class="team_names_team_2"><span class="team_name--team_prefix">Team</span><br /><span class="team_name--team_2_pallet">${currentMatch.team2.name}</span></div>
        </div>
      </div>
      <div class="team_logo team_logo_2">
        <img src="${currentMatch.team2.logo}" alt="${currentMatch.team2.name}" class="team_logo--img team_logo_team_two" />
      </div>
    </div>
    <div class="match_info">
      <div class="match_info--stats">
        <div class="match_info--score">-</div>
        <div class="match_info--time_divider">
          <div>Date:</div>
          <div>${dayjs.unix(currentMatch.id).format('D MMM YYYY - HH:mm a')}</div>
        </div>
        <div class="match_info--score">-</div>
      </div>
      <div class="match_info--toggle_live match_info_toggle_state" onclick="toggleLiveAndInfo({ showInfo: false })">LIVE</div>
    </div>
  `
}


/**
 * REFACATOR - use inner HTML? dom snippets
 * Set the dom to render upcoming matches
 * @param {dict} matches dictionary of matches rendered to dom
 */
function setUpComingMatches(matches) {
  if (!matches || !matches.length)
    return renderDomElm(`.${DOM.UPCOMING_MATCHES}`, 'div', TEXT.NO_MATCHES);
  
  // loop and generate the upcoming
  matches.forEach(match => {
    // render info group
    renderDomElm(`.${DOM.UPCOMING_MATCHES}`, 'div', '',
      {
        'class': `${DOM.UPCOMING_MATCH_INFO} upcoming-group-${match.id}`,
        'data-id': match.id
      })
    // render team name/icon group
    renderDomElm(`.upcoming-group-${match.id}`, 'div', '', { 'class': `${DOM.UPCOMING_MATCH_INFO_TEAM_NAME} team1-name-group-${match.id}` })
    renderDomElm(`.team1-name-group-${match.id}`, 'img', match.team1.logo,
      {
        'class': `upcoming_match_info--team_logo_team_1 ${DOM.UPCOMING_MATCH_INFO_TEAM_LOGO_IMG}`,
        'alt': match.team1.name,
        'src': match.team1.logo
      })
    renderDomElm(`.team1-name-group-${match.id}`, 'div', match.team1.name)
      console.log()
    // render the date
    renderDomElm(`.upcoming-group-${match.id}`, 'div',
      `${dayjs.unix(match.id).format('D MMM YYYY - HH:mm a')}`,
      { 'class': `${DOM.UPCOMING_MATCH_INFO_DATE} info-date-group-${match.id}` })
    
    // render team2 icon/name
    renderDomElm(`.upcoming-group-${match.id}`, 'div', '', { 'class': `${DOM.UPCOMING_MATCH_INFO_TEAM_NAME} team2-name-group-${match.id}` })
    renderDomElm(`.team2-name-group-${match.id}`, 'img', match.team1.logo,
    {
      'class': `upcoming_match_info--team_logo_team_2 ${DOM.UPCOMING_MATCH_INFO_TEAM_LOGO_IMG}`,
      'alt': match.team2.name,
      'src': match.team2.logo
    })
    renderDomElm(`.team2-name-group-${match.id}`, 'div', match.team2.name)
  });
}

/**
 * Get the selected Match
 */
 function getSelectedMatch() {
  const matchesElms = document.querySelectorAll(`.${DOM.UPCOMING_MATCH_INFO}`) || [];
  if (!matchesElms || !matchesElms.length) return;
  for (let i = matchesElms.length - 1; i >= 0; i--) {
    if (matchesElms[i].classList.contains(DOM.UPCOMING_MATCH_INFO_SELECTED)) {
      return matchesElms[i].getAttribute('data-id');
    }
  }
  return null;
}

// ###########################
// END: MATCH INFO
// ###########################

// *****

// ###########################
// START: MAIN VIEW
// ###########################

/**
 * Toggle between live video and info
 */
function toggleLiveAndInfo({ showInfo = true }) {
  const liveVideoDom = document.querySelector(`.${DOM.VIDEO_PLAYER_GROUP}`);
  const matchInfoDom = document.querySelector(`.${DOM.CURRENT_MATCH}`);
  const tournamentNameElm = document.querySelector(`.${DOM.TOURNAMENT_NAME}`);
  const logoElm = document.querySelector(`.${DOM.TOURNAMENT_LOGO}`);
  if (!showInfo) {
    // here we need to show the video
    liveVideoDom.style.display = "grid";
    matchInfoDom.style.display = "none";
    // we also need to make the logo smaller
    logoElm.style.width = "50%";
    tournamentNameElm.style.justifyContent = "start";
    // render the relevant player data
    createRemoveTwitchPlayer({ shouldRender: true });
    return;
  }
  logoElm.style.width = "100%";
  liveVideoDom.style.display = "none";
  matchInfoDom.style.display = "grid";
  tournamentNameElm.style.justifyContent = "center";
  // remove the player element
  createRemoveTwitchPlayer({ shouldRender: false });
  return;
}

/**
 * adds the relevant player source to the player
 * @returns 
 */
function createRemoveTwitchPlayer({ shouldRender = false, matchId = null }) {
  // check the selected team
  // check the should render prop
  const liveVideoDom = document.querySelector(`.${DOM.VIDEO_PLAYER}`);
  const selectedMatch = matchId ?? getSelectedMatch();

  if (!shouldRender) {
    liveVideoDom.removeAttribute("src");
    return;
  }

  if (!selectedMatch) return;
  // add the player data
  const streamSrc = UPCOMING[selectedMatch].stream.src;
  liveVideoDom.setAttribute("src", streamSrc);
  // update info dom data
  return
}

// ###########################
// END: MAIN VIEW
// ###########################

// *****

// ###########################
// START: DOM EVENTS / UTILITIES
// ###########################

/**
 * Get the active view  between player and info
 */
function isPlayerActive() {
  // will need to change when using a state application
  const getVideoPlayer = document.querySelector(`.${DOM.VIDEO_PLAYER}`);
  const checkPlayerSrc = getVideoPlayer.getAttribute('src')
  if (checkPlayerSrc) {
    return true
  }
  return false;
}

/**
 * add the click events for each match
 * @param {array} matches 
 */
 function addDomEvents(matches) {
  const matchesElms = document.querySelectorAll(`.${DOM.UPCOMING_MATCH_INFO}`) || [];
  if (!matches || !Object.keys(matches).length)
    return renderDomElm(`.${DOM.UPCOMING_MATCHES}`, 'div', TEXT.NO_MATCHES);
  
  matchesElms.forEach(matchElm => {
    const id = matchElm.getAttribute('data-id');
    matchElm.addEventListener(`${EVENTS.CLICK}`, () => {
      loading(true);
      console.log('do something', matches[id]); // wait for response before setting selected?
      setActiveMatch(matches[id]);
      setLiveMainViewInfo(matches[id])
      // set player details if the state is live mode
      if (isPlayerActive()) {
        createRemoveTwitchPlayer({ shouldRender: true, match: matches[id]})
      }
      loading(false);
    }, false)
  })
}

// ###########################
// END: DOM EVENTS / UTILITIES
// ###########################
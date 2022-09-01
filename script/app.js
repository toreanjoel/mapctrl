/**
 * Init function that will run on start
 */
(() => {
  // start loader
  loading(true);
  init();
  // end loader
  loading(false);
})()

/**
 * Init the data of the application
 */
function init() {
  // populate dom data
  const currentMatches = getMatches(UPCOMING);
  setUpComingMatches(currentMatches);
  addDomEvents(UPCOMING);
  setActiveMatch();
}

/**
 * The laoding indicator function
 * @param {boolean} isLoading isLoading toggle 
 */
function loading(isLoading) {
  return isLoading;
}

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
 * Set the active match to be displayed by default
 * @param {id} currentMatch the match to use as current - optional will use first
 */
function setActiveMatch(currentMatch) {
  let selectedMatch;
  const matchesElms = document.querySelectorAll('.upcoming_match_info_vs') || [];
  const selectedClass = 'upcoming_match_info_vs--selected';
  // check if user selected
  if (currentMatch) {
    selectedMatch = document.querySelector(`.upcoming-group-${currentMatch}`);
  } else {
      // get first item in list
    selectedMatch = matchesElms[0];
  }

  if (!selectedMatch) return console.error('no element');
  //remove prev instance of class
  matchesElms.forEach(matchElm => matchElm.classList.remove(selectedClass))
  // add class to selected
  selectedMatch.classList.add(selectedClass);
}

/**
 * add the click events for each match
 * @param {array} matches 
 */
function addDomEvents(matches) {
  const matchesElms = document.querySelectorAll('.upcoming_match_info_vs') || [];
  if (!matches || !Object.keys(matches).length)
    return renderDomElm('.upcoming_matches', 'div', "No Matches Found");
  
  matchesElms.forEach(matchElm => {
    const id = matchElm.getAttribute('data-id');
    matchElm.addEventListener('click', () => {
      console.log('do something', matches[id]); // wait for response before setting selected?
      setActiveMatch(id);
    }, false)
  })
}

/**
 * REFACATOR
 * Set the dom to render upcoming matches
 * @param {dict} matches dictionary of matches rendered to dom
 */
function setUpComingMatches(matches) {
  {/* <div class="upcoming_match_info_vs">
    <div class="upcoming_match_info_team_name">
      <div><img src="./assets/examples/OG.png" alt="upcoming team 1" class="upcoming_match_info--team_logo_team_1 upcoming_match_info--team_logo_team--img" /></div>
      <div>Diamond</div>
    </div>
    <div class="upcoming_match_info_date">16/10/2022 21:00 SAST</div>
    <div class="upcoming_match_info_team_name">
      <div><img src="./assets/examples/diamond.png" alt="upcoming team 2" class="upcoming_match_info--team_logo_team_2 upcoming_match_info--team_logo_team--img" /></div>
      <div>Diamond</div>
    </div>
  </div> */}

  if (!matches || !matches.length)
    return renderDomElm('.upcoming_matches', 'div', "No Matches Found");
  
  // loop and generate the upcoming
  matches.forEach(match => {
    // render info group
    renderDomElm('.upcoming_matches', 'div', '',
      {
        'class': `upcoming_match_info_vs upcoming-group-${match.id}`,
        'data-id': match.id
      })
    // render team name/icon group
    renderDomElm(`.upcoming-group-${match.id}`, 'div', '', { 'class': `upcoming_match_info_team_name team1-name-group-${match.id}` })
    renderDomElm(`.team1-name-group-${match.id}`, 'img', match.team1.logo,
      {
        'class': 'upcoming_match_info--team_logo_team_1 upcoming_match_info--team_logo_team--img',
        'alt': match.team1.name,
        'src': match.team1.logo
      })
    renderDomElm(`.team1-name-group-${match.id}`, 'div', match.team1.name)
      console.log()
    // render the date
    renderDomElm(`.upcoming-group-${match.id}`, 'div',
      `${dayjs.unix(match.id).format('D MMM YYYY - HH:mm a')}`,
      { 'class': `upcoming_match_info_date info-date-group-${match.id}` })
    
    // render team2 icon/name
    renderDomElm(`.upcoming-group-${match.id}`, 'div', '', { 'class': `upcoming_match_info_team_name team2-name-group-${match.id}` })
    renderDomElm(`.team2-name-group-${match.id}`, 'img', match.team1.logo,
    {
      'class': 'upcoming_match_info--team_logo_team_2 upcoming_match_info--team_logo_team--img',
      'alt': match.team2.name,
      'src': match.team2.logo
    })
    renderDomElm(`.team2-name-group-${match.id}`, 'div', match.team2.name)
  });
}
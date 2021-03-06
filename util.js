
/* Some util stuff */

/** The current mouse position */
const mousePos = { x: 0, y: 0 };
window.onmousemove = e => { mousePos.x = e.clientX; mousePos.y = e.clientY; };

/**
 * Copy text to the user's clipboard
 * @param {string} text 
 */
function copyToClipboard(text) {
  const el = document.getElementById('clipboard');
  el.innerHTML = text;
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

/**
 * Find an item by it's id
 * @param {string} id 
 */
function itemById(id) {
  return app.allItems.find(i => i.id == id);
}

/**
 * makes an id "readable"
 * @param {string} id the id
 */
function stringifyId(id) {
  if (id.includes(':')) id = id.split(':')[1];
  const out = [];
  for (const word of id.split('_')) {
    out.push(word.substr(0,1).toUpperCase() + word.substr(1));
  }
  return out.join(' ');
}

const showdownConv = new showdown.Converter();
showdownConv.setOption("strikethrough", true);
showdownConv.setOption("underline", true);
/**
 * Converts markdown to HTML using the showdown converter
 * @param {string} md 
 */
function mdToHtml(md) {
  return showdownConv.makeHtml(md);
}

/**
 * Rounds stuff but with digits after the .
 * @param {number} number The number to round
 * @param {number} decimals The amount of digits after the .
 */
function properRound(number, decimals = 0) {
  if (decimals <= 0) return Math.round(number);
  return Math.round((number + Number.EPSILON) * (10 ** decimals)) / (10 ** decimals);
}

maastr.default.tokens = {
  '_': [ 'italic', false, false ],
  '**': [ 'bold', false, false ],
  '##': [ 'shake', true, false ],
  '@@': [ 'blink', false, false ],
  '&&': [ 'flip', false, false ],
  '%%': [ 'rainbow', true, false ],
  '^^': [ 'wave', true, false ]
};
maastr.default.settings.prefix = '<span class="bkstr">';
maastr.default.settings.suffix = '</span>';
/**
 * Parses strings with the ingame format and renders them in HTML
 * @param {string} string The string to parse
 */
function parseBkstr(string) {
  return maastr.parse(string);
}

/* Context menu */

/**
 * Opens a custom context menu.
 * @param {[ { text: string, action: () => void } ]} options the available options
 * @param {number?} posX (optional)
 * @param {number?} posY (optional)
 */
function contextMenu(options, posX, posY) {
  if (!posX) posX = mousePos.x;
  if (!posY) posY = mousePos.y;
  Vue.set(app.contextMenu, 'options', options);
  document.getElementById('context-menu').style.left = `${posX}px`;
  document.getElementById('context-menu').style.top = `${posY}px`;
  document.getElementById('context-menu-cont').classList.add('active');
}

/**
 * Closes a custom context menu.
 * 
 * **This does not have to be called each time a context menu item is clicked!**
 */
function closeContextMenu() {
  Vue.set(app.contextMenu, 'options', [ ]);
  Vue.set(app.itemlist, 'focusElement', '');
  document.getElementById('context-menu-cont').classList.remove('active');
}
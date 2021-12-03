const blocks = JSON.parse(localStorage.getItem('blocks'));

export function staticBlocks(state = blocks) {
    return state;
}

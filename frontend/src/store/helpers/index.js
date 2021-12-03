
export async function imageExists(imageUrl) {
    const xhr = new XMLHttpRequest();
    await xhr.open('HEAD', imageUrl, true);
    await xhr.send();

    if (xhr.status === '404') {
        return false;
    }
    return true;
}

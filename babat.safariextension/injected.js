var tip;

document.addEventListener('mousedown', function () {
    if (tip) tip.detach();
});

window.addEventListener('message', function (e) {
    if (e.origin != window.location.origin) return;

    var selection = window.getSelection();
    var selectionBounds = selection.getRangeAt(0).getBoundingClientRect();
    tip = new Tooltip('Balance: ' + e.data, { baseClass: 'tooltip-babat' });
    tip.position(selectionBounds.x + selectionBounds.width / 2, selectionBounds.y).show();
});

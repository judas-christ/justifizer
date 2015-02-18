(function(window, document) {

    /**
     * Layout children of container in a row based grid
     * @param  {String|HTMLElement} container Element to layout children of
     */
    function justifize(container, options) {
        
        var minHeight = options && options.minHeight || 200;
        var rowWidth = 0,
            rowRatio = 0,
            item,
            ratio;

        if (typeof container === 'string')
            container = document.querySelector(container);

        var containerWidth = container.offsetWidth;
        var currentRow = [];
        var currentRowTop = 0;
        var items = container.children;
        
        for (var i = 0, l = items.length; i < l; i++) {
            var item = items[i];
            if(!item.__justifizeRatio__) {
                // width = item.offsetWidth;
                // height = item.offsetHeight;
                item.__justifizeRatio__ = ratio = item.offsetWidth / item.offsetHeight;
                // item.setAttribute('data-ratio',ratio);
            } else {
                ratio = item.__justifizeRatio__;
            }

            if ((rowRatio + ratio) * minHeight < containerWidth) {
                //when this item fits in the current row
                rowRatio += ratio;
                currentRow.push(item);
            } else {
                //when the row is full
                currentRowTop += layoutRow(containerWidth, currentRow, rowRatio, currentRowTop);
                currentRow = [item]; //test if this is better than .length = 0
                //currentRow.length = 0;
                //currentRow.push(item);
                rowRatio = ratio;
            }
        }

        //do final row
        currentRowTop += layoutRow(containerWidth, currentRow, rowRatio, currentRowTop);

        container.style.height = currentRowTop + 'px';
        container.style.position = 'relative';
    }

    /**
     * Layout a single row, calculating the final ratio for the row and the height of all items and setting size and position of the items.
     * @param  {Number} containerWidth Width of container in pixels
     * @param  {Array} items          Items to layout in a row
     * @param  {Number} rowRatio       The ratio of width/height of the entire row
     * @param  {Number} rowTop         The top position in pixels of the row
     * @return {Number}                Height of layed out row
     */
    function layoutRow(containerWidth, items, rowRatio, rowTop) {
        var rowHeight = containerWidth / rowRatio;
        var rowWidth = 0;

        for (var i = 0, l = items.length; i < l; i++) {
            var item = items[i];

            var ratio = item.__justifizeRatio__;

            var adjustedWidth = ratio * rowHeight;

            item.style.top = rowTop + 'px';
            item.style.left = rowWidth + 'px';
            item.style.height = rowHeight + 'px';
            item.style.width = adjustedWidth + 'px';
            item.style.position = 'absolute';
            
            rowWidth += adjustedWidth;
        }

        return rowHeight;
    }

    /**
     * Destroy layout on element
     * @param  {String|HTMLElement} container Container element
     */
    justifize.destroy = function(container) {

        if (typeof container === 'string')
            container = document.querySelector(container);

        var items = container.children,
            item;
        
        for (var i = 0, l = items.length; i < l; i++) {
            
            item = items[i];
            
            item.style.position = null;
            item.style.height = null;
            item.style.width = null;
            item.style.top = null;
            item.style.left = null;

            delete item.__justifizeRatio__;
        }

        container.style.height = null;
        container.style.position = null;
    }

    //export justifize function
    window.justifize = justifize;

})(this, document);
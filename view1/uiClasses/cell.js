uiClasses.factory("Cell",
    function () {
        function Cell(obj) {

            this.cell = new angular.element("<div class='col-xs-3' id='cell'></div>");
            this.cell.x = obj.x;
            this.cell.y = obj.y;
            this.cell.value =obj.value;
            if (this.cell.value > 0) {
                this.cell.html(this.cell.value);
                this.cell.addClass("yellow");
            }

        }

        Cell.prototype = {
            addToElement: function (element) {
                element.append(this.cell);
            },
            getX: function () {
                return this.cell.x;
            },
            getY: function () {
                return this.cell.y;
            },
            getValue: function() {
                return this.cell.value;
            },
            setValue:function(value) {
                this.cell.value = value;
            },
            redraw:function() {
                if (this.cell.value > 0) {
                    this.cell.html(this.cell.value);
                    this.cell.addClass("yellow");
                }
                else {
                    this.cell.html("");
                    this.cell.removeClass("yellow");
                }
            }


        };
        return (Cell);
    });
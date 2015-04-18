uiClasses.factory("Cell",
    function () {
        function Cell(obj) {

            this.cell = new angular.element("<div  id='cell'></div>");
            this.cell.x = obj.x;
            this.cell.y = obj.y;
            this.cell.new = true;
            this.cell.value =obj.value;
            if (this.cell.value > 0) {
                this.cell.html(this.cell.value);
                this.cell.addClass("full");
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
            setNew:function(n) {
              this.cell.new = true;
            },
            redraw:function() {
                if (this.cell.value > 0) {
                    this.cell.html(this.cell.value);

                    this.cell.addClass("full");

                    if (this.cell.new) {
                        this.cell.addClass("new");
                        this.cell.new = false;
                    }
                    else {
                        this.cell.removeClass("new");
                    }
                }
                else {
                    this.cell.html("");
                    this.cell.removeClass("full");
                    this.cell.removeClass("new");
                }
            }


        };
        return (Cell);
    });
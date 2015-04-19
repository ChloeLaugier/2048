uiClasses.factory("Cell",
    function () {
        function Cell(obj) {

            this.cell = new angular.element("<div  id='cell'></div>");
            this.cell.x = obj.x;
            this.cell.y = obj.y;
            this.cell.new = true;
            this.cell.value =obj.value;
            this.cell.justAdded = false;
            if (this.cell.value > 0) {
                this.cell.html(this.cell.value);
                this.cell.addClass("full"+this.cell.value);
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
            isJustAdded:function() {
              return this.cell.justAdded;
            },
            setJustAdded:function(added) {
                this.cell.justAdded = added;
            },
            redraw:function() {
                if (this.cell.value > 0) {
                    this.cell.html(this.cell.value);

                    this.cell.attr("class", "");

                    this.cell.addClass("full"+this.cell.value);

                    if (this.cell.new) {
                        this.cell.addClass("new");
                        this.cell.new = false;
                    }
                    this.cell.justAdded = false;
                }
                else {
                    this.cell.html("");
                    this.cell.attr("class", "");
                }
            }


        };
        return (Cell);
    });
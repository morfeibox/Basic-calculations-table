// initsialization
var arr = [];
var currentValue;
var evaluationArr = [];
var insertDeletePoint;
var index;
var myTable = document.getElementById("out");


document.body.onload = makeTable();

function makeTable() {
    for (var r = 0; r < 5; r++) {
        var dRow = myTable .insertRow(-1);
        index=97;
        for (var c = 0; c < 5; c++) {
            var cell = dRow.insertCell(-1);

            var newInput = document.createElement("input"); // (20-27rows) logic is redundant in the code
            newInput.type = "text";
            newInput.className = "hasmenu";
            newInput.setAttribute("placeholder", String.fromCharCode(index).toUpperCase() + Number(r+1));
            newInput.setAttribute("id", String.fromCharCode(index) + Number(r+1));
            newInput.setAttribute("onblur", "getValue(this.value,this.id)");
            newInput.setAttribute("onmouseout", "evaluation(this)");
            newInput.setAttribute("onfocus", "getId(this)");

            arr.push({
                key: String.fromCharCode(index) + Number(r+1),
                value: 0,
                compute: false
            });
            if (index <=121) {
                index++;
            }else
                index=97;
            cell.appendChild(newInput);
        }

    }

}



// Beginning of Business logic



function getValue(value, id) {

   // var element = document.getElementById(id);
    //element.setAttribute("data-value", element.value.toLocaleLowerCase());
        function findObj(obj) {
            return obj.key === id;
        }
        var index = arr.indexOf(arr.find(findObj));

            arr[index] = {
                key: id,
                value: value,
                compute: false
            };
}




function evaluation(e) {
    // eval values if there are just numbers
    var re = /[A-Za-z]/;
    if (!re.test(e.value)) {
        currentValue = e.value;
        var isEqual = e.value.charAt(0);
        if (isEqual === "=") {
            e.value = e.value.substring(1);
            var char = e.value.split(" ");
            if(typeof char !== "undefined") {
                var result = eval(char.join(' ')).toString();
            }
            var element = document.getElementById(e.id);
            element.setAttribute("data-value", e.value.toLocaleLowerCase());
            element.value = result;

        }
    } else {  // eval values if there are contains alphanumerics
       var element = document.getElementById(e.id);
        element.setAttribute("data-value", e.value.toLocaleLowerCase());

        var mathString = e.value.toLocaleLowerCase();
        var a = mathString.replace(/[-/()+=*]/g, '').split('');

        for (var i = 0; i < a.length; i++) {
            var filter = /^[a-zA-Z]{1}/;

            var formulaId = a[i] + a[i + 1];

            if (("" + formulaId.charAt(0)).match(filter)) {
                   function findObj(obj) {
                       return obj.key === formulaId;
                   }
                   var index = arr.indexOf(arr.find(findObj));
                   evaluationArr.push(arr[index].value);
                   mathString = mathString.replace(formulaId, arr[index].value);
                   finalResult(mathString, e);

            }

        }
    }
}

function finalResult(mathString, e){
    if (mathString.indexOf("null") !== -1){
        mathString = mathString.replace(/null/g , "0");
    }

    var re = /[A-Za-z]/;
    if (!re.test(mathString)) {
            var isEqual = mathString.charAt(0);
            if (isEqual === "=") {
                mathString = mathString.substring(1);
                var char = mathString.split(" ");
                var result = eval(char.join(' ')).toString();
                var element = document.getElementById(e.id);
                element.value = result;
            }
    }
}


//Tis function should be  optimised make two different things
function getId(element){
   
    var x = document.getElementById(element.id).getAttribute("data-value"); //връща формлата в полето

    document.getElementById(element.id).value = x;

   var currentRow =element.id.substr(1); //select row insert/delete point
    insertDeletePoint =parseInt(currentRow)+1;


}


function contextMenu(ui){

    if (ui.cmd === "Insert Row") {
        insertRow();
    }else if(ui.cmd === "Delete Row"){
        deleteRow();
    }else if(ui.cmd === "Insert Column"){
        insertColumn();
    }else if(ui.cmd === "Delete Column"){
        deleteColumn();
    }
}


function insertRow(){
    var myColumns = myTable.rows[0].cells.length;
    var row = myTable.insertRow(insertDeletePoint-1);

    for (var c = 0; c < myColumns; c++) {
        var cell = row.insertCell(-1);

        var newInput = document.createElement("input");
        newInput.type = "text";
        newInput.className = "hasmenu";
        newInput.setAttribute("id", String.fromCharCode(index) + c+c); //this line should be optimized
        // when is defined how to generate the new id's
        newInput.setAttribute("onblur", "getValue(this.value,this.id)");
        newInput.setAttribute("onmouseout", "evaluation(this)");
        newInput.setAttribute("onfocus", "getId(this)");

        arr.push({
            key: String.fromCharCode(index) + c+c,//this line should be optimized
            // when is defined how to generate the new id's
            value: null,
            compute: false
        });
        if (index <=121) { //this check will be useful for very big table which exceed a-z numeration
            index++;
        }else
            index=97;

        cell.appendChild(newInput);

    }
}

function deleteRow(){
    document.getElementById("out").deleteRow(insertDeletePoint-1);
}

function insertColumn(){
        var myRows = myTable.rows.length;

        for (var b = 0; b < myRows; b++) {
            var cell= myTable.rows[b].insertCell(insertDeletePoint-1);
            var newInput = document.createElement("input");
            newInput.type = "text";
            newInput.className = "hasmenu";
            newInput.setAttribute("id", String.fromCharCode(index) + b);
            newInput.setAttribute("onblur", "getValue(this.value,this.id)");
            newInput.setAttribute("ondblclick", "evaluation(this)");
            newInput.setAttribute("onfocus", "getId(this)");
            cell.appendChild(newInput);
        }

}

function deleteColumn(){
    var allRows = document.getElementById('out').rows;
    for(var i=0; i< allRows.length; i++) {
        if (allRows[i].cells.length > 0) {
            allRows[i].deleteCell(insertDeletePoint); //insertDeletePoint implication should be optimsied

        }
    }
}



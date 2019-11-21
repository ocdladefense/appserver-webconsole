




 //Function which sets up the Chapter picker select menu
function uiChapterPicker(chapters){
    var selectMenu = document.getElementById("chapterDropDown");

        for (var i = 0; i < chapters.length; i++){
            var chaptersName = chapters[i].name;
            var chaptersNameParsed = chaptersName.charAt(0).toUpperCase() + chaptersName.slice(1);
            var selectOption = document.createElement("option");
            selectOption.setAttribute("value", chaptersName);
            selectOption.appendChild(document.createTextNode(chaptersNameParsed.replace("-", " ")));
            selectMenu.appendChild(selectOption);
        }
    }


 //Creates table cells based off of the material name and link
    function renderMaterial(materialName,filesize,filetype,link){
        var tableCellName = vNode("div",{className:"Rtable-cell name"}, materialName);
        var tableCellFileSize = vNode("div",{className:"Rtable-cell filesize"},filesize);
        var tableCellFileType = vNode("div",{className:"Rtable-cell filetype"},filetype);
        var tableCellLink = linkContainer(link);
        var rowContainer = vNode("div",{className:"row-container"},[tableCellName,tableCellFileSize,tableCellFileType, tableCellLink]);
        
        console.log(rowContainer);
        
        return createElement(rowContainer);
        }

        function renderChapter(chapter){
            var materials = chapter.materials;
            var table = document.createElement("div");
            table.setAttribute("class", "Rtable Rtable--4cols");
            var chapterHeader = document.createElement("h1");
            chapterName = chapter.name;
            chapterNameParsed = chapterName.charAt(0).toUpperCase() + chapterName.slice(1);
            
            chapterHeader.appendChild(document.createTextNode(chapterNameParsed.replace("-", " ")));
            table.appendChild(chapterHeader);
            
                for(var i=0; i < materials.length; i++){
                    
                    table.appendChild(renderMaterial(materials[i].name, materials[i].filesize, materials[i].filetype, materials[i].link));

                }
                
                return table;

        }

        function renderOuterTable(chapters){
            var tableContainer = document.createElement("div");
            tableContainer.setAttribute("class", "table-container")
             
            for (var i = 0; i < chapters.length; i++){
              
                tableContainer.appendChild(renderChapter(chapters[i]));
            }

            return tableContainer;
        }

        function filterChapters(chapterName){
            return promise.then(function(data){

            var chapters = data.chapters;
            var filtered = [];
            if(chapterName == "Show All Chapters"){
                return chapters;
                
            }
            if (chapterName != null){
                console.log(chapterName);
                for(i = 0; i < chapters.length; i++){
                    if(chapters[i].name == chapterName){
                        filtered.push(chapters[i]);
                    }
                }
            }
            return filtered;
        });
            //return filtered;
            
        }

        function renderData(chapters){
             var tableContainer2 = document.getElementById("table-container2");
             var existingTable = null == tableContainer2.firstChild ? false : true;
              if(existingTable){
                  tableContainer2.replaceChild(renderOuterTable(chapters), tableContainer2.firstChild);
              }
              else{

            tableContainer2.appendChild(renderOuterTable(chapters));   
              }
        }

        /* User interface actions */
       
        
        function showAllChapters(chapters){
            filterChapters("Show All Chapters").then(renderData);     
        }

        function showSomeChapters(chapterName){
            filterChapters(chapterName).then(renderData);
           
        }


        function show(chapterName){
            if( null == chapterName){
                showAllChapters();
            } else {
                showSomeChapters(chapterName);
            }
        }


 
       
     
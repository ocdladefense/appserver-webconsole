




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
    function getMaterial(materialName,filesize,filetype,link){
        var tableCellName = vNode("div",{className:"Rtable-cell name"}, materialName);
        var tableCellFileSize = vNode("div",{className:"Rtable-cell filesize"},filesize);
        var tableCellFileType = vNode("div",{className:"Rtable-cell filetype"},filetype);
        var tableCellLink = linkContainer(link);
        var rowContainer = vNode("div",{className:"row-container"},[tableCellName,tableCellFileSize,tableCellFileType, tableCellLink]);
        
        console.log(rowContainer);
        
        return rowContainer;
        }

        function getChapter(chapter){
            var vNodes = [];
            var materials = chapter.materials;
            var table = vNode("div", {className:"Rtable Rtable--4cols"});
            //var chapterHeader = document.createElement("h1");
            chapterName = chapter.name;
            chapterNameParsed = chapterName.charAt(0).toUpperCase() + chapterName.slice(1);
            
            //chapterHeader.appendChild(document.createTextNode(chapterNameParsed.replace("-", " ")));
            //table.appendChild(chapterHeader);
            
                for(var i=0; i < chapter.materials.length; i++){
                    
                vNodes.push(getMaterial(materials[i].name, materials[i].filesize, materials[i].filetype, materials[i].link));

                }

                table.children = vNodes;

                return table;

        }

        function getOuterTable(chapters){
            var vNodes = [];
            var tableContainer = vNode("div",{className:"table-container"});
            for (var i = 0; i < chapters.length; i++){
              
                vNodes.push(getChapter(chapters[i]));
            }

            tableContainer.children = vNodes;

            return tableContainer;
        }

        function filterChapters(chapters,chapterName){
            var filtered = [];
            if(chapterName == null){
                return chapters;
                
            }
                for(i = 0; i < chapters.length; i++){
                    if(chapters[i].name == chapterName){
                        filtered.push(chapters[i]);
                    }
                }       
            return filtered;  
        }
       
        /* User interface actions */
       


        function show(json,chapterName){
           var filteredList = filterChapters(json.chapters,chapterName);
           return getOuterTable(filteredList);

        }


 
       
     
$.ajax({
    url: "data/grammys.json",
    type: "GET",
    dataType: "json",
    success : function(data){
        let new_html ="";
        let fields = data["fields"];
 
        for(let i=0; i<fields.length; i++){
            new_html += `
            <option value="${fields[i].field_id}">
            ${fields[i].field}
            </option>
            `;
        }
        $("#category_types").append(new_html);
        loadNominees();
    },
    error: function(error_msg){
        console.err(error_msg);
    }
});

function loadNominees(){
    $.ajax({
        url: "data/grammys.json",
        type: "GET",
        dataType: "json",
        success : function(data){
           $("#category_types").on('change', function(event){
            let new_html ="";
            //Clean of previous selection
            $("#nominees_section").html(new_html);

            let fields = data["fields"];
            let id = $(this).val();

            for(let i=0; i<fields.length;i++){
                if(id == fields[i].field_id){
                    //Add field title
                    new_html += `<h2>${fields[i].field}</h2>`;
                    
                    //Add description, check if it has description 
                    if(fields[i].description != null){
                        new_html += `<p class="description">${fields[i].description}</p>`;
                    }
                    //Add categories
                    for(let j=0; j<fields[i].categories.length; j++){
                        new_html += `<div class="card">
                            <h3>${fields[i].categories[j].category_name}</h3>
                            <p>${fields[i].categories[j].description}</p>
                        `;
                        //Add nominees for each
                        for(let k=0; k<fields[i].categories[j].nominees.length; k++){
                            if(fields[i].categories[j].winner_id == k){
                                new_html += `
                                <h4 class="winner">${fields[i].categories[j].nominees[k].nominee}</h4>
                                <span> WINNER! </span>
                                <p>${fields[i].categories[j].nominees[k].artist}</p>
                                <p>${fields[i].categories[j].nominees[k].info}</p>
                            `;
                            }else{
                                new_html += `
                                <h4>${fields[i].categories[j].nominees[k].nominee}</h4>
                                <p>${fields[i].categories[j].nominees[k].artist}</p>
                                <p>${fields[i].categories[j].nominees[k].info}</p>
                            `;
                            }

                        }         
                        new_html += `</div>`;
                    }
                    //$("#stateCapital").val(data[i].capital);   
                }

            }
            $("#nominees_section").append(new_html); 
           });
        },
        error: function(error_msg){
            console.err(error_msg);
        }
    });
}

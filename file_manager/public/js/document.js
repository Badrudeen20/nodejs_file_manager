let check = []
function selectedFolder(folderId){
    $('#file_container').empty()
    
    if(check.includes(folderId)){
         const index = check.indexOf(folderId)
         $(`.drop${folderId}`).addClass('hideChild')
         $(`#folder_${folderId}`).addClass('fa-chevron-down')
         $(`#folder_${folderId}`).removeClass('fa-chevron-up')
        
         if(index !== -1){
             check.splice(index,1)
         }
    }else{
        check.push(folderId)
        $(`.drop${folderId}`).removeClass('hideChild')
        $(`#folder_${folderId}`).removeClass('fa-chevron-down')
        $(`#folder_${folderId}`).addClass('fa-chevron-up')
        $.ajax({
            url:"/folder/files",
            type:"GET",
            data:{folderId:folderId},
            success:function(data){
              var {files} = data
             
             files.forEach(file => {
                $('#file_container').append(`
                    <div class="file-box">
                        <div class="file">
                            <a href="#">
                                <span class="corner"></span>
    
                                <div class="icon">
                                    <i class="img-responsive fa fa-film"></i>
                                </div>
                                <div class="file-name">
                                    ${file.name}
                                    <br>
                                    <small>Added: Fab 18, 2014</small>
                                </div>
                            </a>
                        </div>
                    </div>
               `)
             });
           
            }
        })
    }
  
 
  
}
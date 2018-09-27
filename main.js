window.onload = function(e){
    
    var items = document.querySelectorAll('.part-group-header');
    
    for(var i = 0; i < items.length; i++){
        items[i].onclick = function(){
			this.parentElement.classList.toggle('active');
        }
    }
    
}

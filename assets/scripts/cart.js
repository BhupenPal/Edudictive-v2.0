if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready(){
    var add_button=document.getElementsByClassName('add-cart-button');
    course_item=[];
    
    
    for(var i=0;i<add_button.length;i++){
        add_button[i].addEventListener('click',function(e){
            
            parent_element=e.target.parentElement
            var course_name=parent_element.getElementsByClassName('course-name')[0];
            var course_price=parseFloat(parent_element.getElementsByClassName('course-price')[0].innerText.replace('$',''));
            
            let obj={
                name:course_name.innerText,
                price:course_price
            }
            
            if (e.target.innerText=='Add to cart'){
                e.target.innerText='Remove'
                course_item.push(obj)
                
            }
            else{
                e.target.innerText='Add to cart'
                remove_wishlist_item(obj)
            }

            localStorage_operation(course_item)
           
            

        })
        }

    }
function localStorage_operation(course_item){
localStorage.setItem("myobj",JSON.stringify(course_item))

let course_from_localstorage=JSON.parse(localStorage.getItem('myobj'))
// costHandler(obj_from_storage)

clear_list()

for(var i=0;i<course_from_localstorage.length;i++){
    display_wishlist(course_from_localstorage[i].name,course_from_localstorage[i].price)
}
}

function remove_wishlist_item(obj){                 //removing course from wishlist
localStorage.removeItem('myobj')
for(var i=0;i<course_item.length;i++)
{
    if (course_item[i].name==obj.name){
        index_of_removable_course=i
    }

}
course_item.splice(index_of_removable_course,1)

}
function clear_list(){      
var wishlist=document.getElementsByClassName('items')[0]

while(wishlist.hasChildNodes())
{
    wishlist.removeChild(wishlist.firstChild)
}
}
    

function costHandler(course_from_storage){          //calculating total cost of wishlist courses
total=0
        for(var j=0;j<course_from_storage.length;j++){

            console.log(course_from_storage[j].price);

            course_from_storage_price=obj_from_storage[j].price;

            total=total+course_from_storage_price
        }
        console.log(total)
}

function display_wishlist(name,price){

var wishlist=document.getElementsByClassName('items')[0]
var contents=`<div>
    <span class="course-name">${name}</span>
    <span class="course-price">${price}</span>
</div>`

var wishlist_content=document.createElement('div')

wishlist_content.innerHTML=contents
wishlist.append(wishlist_content)          

}
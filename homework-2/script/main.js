window.addEventListener('DOMContentLoaded', () => {
    
    const tabelUser = document.querySelector('.tabel-user');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelectorAll('.fa-times');
    const checkboxFirst = document.querySelector('.tabel-checkbox-first');
    const valueCompany = document.querySelector('.input-company');
    const valueName = document.querySelector('.input-name');
    const valueAddress = document.querySelector('.input-address');
    const updateUserBtn = document.querySelector('.btn-dark');
    const showPostForm = document.querySelector('.form-btn');
    const modalCreateUser = document.querySelector('.modal-create-user');
    const postBtn = document.querySelector('.post-btn');
    const newNameData = document.querySelector('.create-name');
    const newCompanyData = document.querySelector('.create-company');
    const newAddressData = document.querySelector('.create-address');
    const newCityData = document.querySelector('.create-city');
    const newCountyData = document.querySelector('.create-country');
    const allCheckbox = document.querySelector('.box-checkbox-first');
    const paginationPage = document.querySelector('.pagination')
    let secondaryCheckbox;
    let deleteBtn;
    let checkboxBtn;

    const userFilterCompany = document.querySelector('.user-company');
    const userFilterName = document.querySelector('.user-contact');
    const filterUserBtn = document.querySelector('.filter-user');
    const userFilterAddress = document.querySelector('.user-address');

    let modalNumber;
    let dataCompany = [];
    let dataName = [];
    let dataAddress = [];
    let dataIdUser = [];
    let navigationBtn = [];


    let url = 'http://localhost:3000/users';

    const getAllUsers = async ( url ) => {
        const result = await fetch( url );

        if( !result.ok ) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`)
        }

        return await result.json();
    }



    const createUser = async ( obj ) => {
        const create = await fetch( url, {
            method: 'POST',
            body: JSON.stringify(obj),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
        
        if (!create.ok) {
            throw new Error(`Someting went wrong, Status code ${create.status}`)
        }
        return await create.json();
    }


    
    const deleteUser = async (id) => {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Someting went wrong, Status code ${response.status}`)
        }
        return await response.json();
    }



    const updateUser = async (id, obj) => {
        const update = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
        
        if (!update.ok) {
            throw new Error(`Someting went wrong, Status code ${update.status}`)
        }
        return await update.json();
    }




    getAllUsers(url)
        .then(value => value.reverse())
        .then(data => {
            paginationUser(data); 
        });
        

    filterUserBtn.addEventListener('click', () => {
        getAllUsers(url)
        .then(data => {
                let filterDataCompany = data.filter(value => value.company.startsWith( userFilterCompany.value.toUpperCase() ));
                let filterDataName = filterDataCompany.filter(value => value.name.startsWith(userFilterName.value.toUpperCase()));
                let filterDataAddress = filterDataName.filter(value => value.address.startsWith(userFilterAddress.value.toUpperCase()));

                renderUserInfo(filterDataAddress);


                if (!userFilterCompany.value && !userFilterName.value && !userFilterAddress.value) {
                    showPage(navigationBtn[0], data);
                    
                }
        });
    });


    let notesOnPage = 5;

    function paginationUser(data) {
        let counOfPages = Math.ceil(data.length / notesOnPage);
        

        for (let i = 1; i <= counOfPages; i++) {
        let paginationBtn = document.createElement('li');
            paginationBtn.classList.add('pagination-list');
            navigationBtn.push( paginationBtn );
            paginationBtn.textContent = i;
            paginationPage.append( paginationBtn );
        }

        showPage(navigationBtn[0], data);
        
        navigationBtn.forEach((btn) => {
            btn.addEventListener('click', function() {
                showPage( this, data );
            });
        });
    }

    let activeList;
    function showPage(item, data) {

        dataCompany.splice(0, dataCompany.length);
        dataName.splice(0, dataName.length);
        dataAddress.splice(0, dataAddress.length);
        dataIdUser.splice(0, dataIdUser.length);
        
        if ( activeList ) {
            activeList.classList.remove('active-pagination');
        } 
            activeList = item;
            item.classList.add('active-pagination');
            
        
        let pageNum = +item.innerHTML;

        let start = (pageNum - 1) * notesOnPage;
        let end = start + notesOnPage;

        let notes = data.slice(start, end);
        notes.forEach(({ company, name, address, id }) => {
            dataCompany.push( company );
            dataName.push( name );
            dataAddress.push( address );
            dataIdUser.push( id );
        });
        renderUserInfo( notes );
    }
    

    function renderUserInfo(value) {
        tabelUser.innerHTML = '';

        value.forEach(( {company, name, address, city, country} ) => {
            tabelUser.innerHTML += `
                <tr class="tabel-user-info">
                    <td class="tabel-user-list">
                    <label class="checkbox">
                        <input class="tabel-checkbox" name="user-checkbox" type="checkbox">
                        <span class="box-checkbox "></span>
                    </label>
                    </td>
                    <td class="tabel-user-list">${company}</td>
                    <td class="tabel-user-list">${name}</td>
                    <td class="tabel-user-list">${address}</td>
                    <td class="tabel-user-list">${city}</td>
                    <td class="tabel-user-list">${country}</td>
                    <td class="tabel-user-list"><i class="fas fa-pen"></i></td>
                    <td class="tabel-user-list"><button type="button" class="delete-user"><i class="fas fa-times-circle"></i></button></td>
                </tr>
            `;
            
        }); 
        
        let changeDataBtn = document.querySelectorAll('.fa-pen');
            deleteBtn = document.querySelectorAll('.delete-user');
            secondaryCheckbox = document.querySelectorAll('.box-checkbox');
            checkboxBtn = document.querySelectorAll('.tabel-checkbox');
    
        secondaryCheckbox.forEach(( item, index ) => {
                item.addEventListener('click', () => {
                    if ( !item.classList.contains('checked') ) {
                        item.classList.add('checked');
                        deleteBtn[index].classList.add('active-delete-btn');
                        deleteData( deleteBtn, dataIdUser );
                        return;
                    } else {
                        item.classList.remove('checked')
                        deleteBtn[index].classList.remove('active-delete-btn');
                    }
                    
                });
            });
            changeData(changeDataBtn);
            
    }
    
    checkboxFirst.addEventListener('click', (e) => {
        if (e.target.checked) {
            allCheckbox.classList.add('checked');
            e.target.classList.add('checked');
            deleteBtn.forEach(deleteBtn => deleteBtn.classList.add('active-delete-btn'));
            checkboxBtn.forEach(checkbox => checkbox.checked = 'true');
            secondaryCheckbox.forEach(checkBnt => checkBnt.classList.add('checked'));
        } else {
            allCheckbox.classList.remove('checked');
            checkboxBtn.forEach(checkbox => checkbox.checked = 'false');
            deleteBtn.forEach(deleteBtn => deleteBtn.classList.remove('active-delete-btn'));
            secondaryCheckbox.forEach(checkBnt => checkBnt.classList.remove('checked'));
        }
    });

    
    function changeData ( btnPen ) {
        btnPen.forEach(( button, index ) => {
            button.addEventListener('click', (e) => {
                modalNumber = index;
                modal.classList.add( 'show' );
                valueCompany.value = dataCompany[index];
                valueName.value = dataName[index];
                valueAddress.value = dataAddress[index];  
                
            });
        });

    };
    

    closeBtn.forEach((close) => {
        close.addEventListener('click', (e) => {
            modal.classList.remove( 'show' );
            modalCreateUser.classList.remove('show');    
        });
    });

    showPostForm.addEventListener('click', () => {
        modalCreateUser.classList.add('show');
    });
    
    
    function deleteData ( btn, dataIdUser ) {
        btn.forEach(( item, index ) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
              deleteUser(dataIdUser[index]); 
            });
        });
    };

    updateUserBtn.addEventListener('click' , (e) => {
        e.preventDefault();
       updateData(dataIdUser[modalNumber]); 
    });

    function updateData ( dataIdUser) {
        let objData = {
            company: valueCompany.value.toUpperCase(),
            name: valueName.value,
            address: valueAddress.value,
        }
        updateUser(dataIdUser, objData)
    }

    

    postBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createUserData ();
    });


    function firstLetterBig (atribute) {
       return atribute.value[0].toUpperCase() + atribute.value.slice(1, atribute.length);
    }

    function createUserData() {
       let userObj = {
        name: firstLetterBig(newNameData),
        company: newCompanyData.value.toUpperCase(),
        address: firstLetterBig(newAddressData),
        city: firstLetterBig(newCityData),
        country: firstLetterBig(newCountyData),
       };
       createUser(userObj);
    }


    
});
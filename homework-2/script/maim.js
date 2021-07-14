window.addEventListener('DOMContentLoaded', () => {
    
    const tableUser = document.querySelector('.table-user');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelectorAll('.fa-times');
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

    

    let modalNumber;
    let dataCompany = [];
    let dataName = [];
    let dataAddress = [];
    let dataIdUser = [];


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
            data.forEach(({ company, name, address, city, country,id}, index ) => {
                dataCompany.push( company );
                dataName.push( name );
                dataAddress.push( address );
                dataIdUser.push( id );
                if(index >= 7) {
                    return;
                }
                renderUserInfo( company, name, address, city, country );
            });
        });

    
    function renderUserInfo(company, name, address, city, country) {
        tableUser.innerHTML += `
        <tr class="table-user-info">
            <td class="table-user-list">
            <label class="checkbox">
                <input class="tabel-checkbox" name="user-checkbox" type="checkbox">
                <span class="box-checkbox"></span>
            </label>
            </td>
            <td class="table-user-list">${company}</td>
            <td class="table-user-list">${name}</td>
            <td class="table-user-list">${address}</td>
            <td class="table-user-list">${city}</td>
            <td class="table-user-list">${country}</td>
            <td class="table-user-list"><i class="fas fa-pen"></i></td>
            <td class="table-user-list"><button class="delete-user"><i class="fas fa-times-circle"></i></button></td>
        </tr>
    `;

        let checkboxBtn = document.querySelectorAll('.tabel-checkbox');
            changeDataBtn = document.querySelectorAll('.fa-pen');
            deleteBtn = document.querySelectorAll('.delete-user');


            checkboxBtn.forEach(( item, index ) => {
                item.addEventListener('change', () => {
                    if ( item.checked ) {
                        deleteBtn[index].classList.add('active-delete-btn');
                        deleteData( deleteBtn, dataIdUser );
                        return;
                    } else {
                        deleteBtn[index].classList.remove('active-delete-btn');
                    }
                });
            });

            changeData(changeDataBtn);
    }
    
    

    function changeData ( btnPen ) {
        btnPen.forEach(( button, index ) => {
            button.addEventListener('click', () => {
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

    showPostForm.addEventListener('click', (e) => {
        e.preventDefault();
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
            name: firstLetterBig(valueName),
            address:firstLetterBig(valueAddress),
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
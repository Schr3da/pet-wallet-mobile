const axios = require('axios').default;
const fs = require('fs');
const superagent = require('superagent');
const path = require('path');

// --------------------------------------------------------------------------
const serviceHost_DOCKER = "http://localhost:8080";
const serviceHost_LOCAL_DEV_BERNHARD_DEBUG = "http://localhost:9000";
const serviceHost_PROD = "https://wallet.pet-care.rocks";

const LOCAL_PATH_TEST_ASSETS = 'C:/workspaces/pet-wallet-backend/testclient/src/assets';
// --------------------------------------------------------------------------
// ++++++++++++++++++++++++++++++++++++++++++++++ !!!! !!! 
const serviceHost = serviceHost_PROD;
//const serviceHost = serviceHost_LOCAL_DEV_BERNHARD_DEBUG;
// ++++++++++++++++++++++++++++++++++++++++++++++ !!!! !!! 
// --------------------------------------------------------------------------
const userCreateUrl = "/api/petpass/user/create";
const userUpdateUrl = "/api/petpass/user/update";
const userFindUrl = "/api/petpass/user/find";
const userDeleteUrl = "/api/petpass/user/delete";

const petCreateUrl = "/api/petpass/pet/create";
const petUpdateUrl = "/api/petpass/pet/update";
const petFindUrl = "/api/petpass/pet/find";
const petDeleteUrl = "/api/petpass/pet/delete";

const petShareCreateUrl = "/api/petpass/share/create";
const petShareFindUrl = "/api/petpass/share/find";

const petWalletCreateUrl = "/api/petpass/wallet/create";
const petWalletUpdateUrl = "/api/petpass/wallet/update";
const petWalletFindUrl = "/api/petpass/wallet/find";
const petWalletPostImageUrl = "/api/petpass/wallet/process";
const petWalletDeleteScanUrl = "/api/petpass/wallet/deleteProcessed";

const petWalletFindMedicineById = "/api/petpass/medicine/findById";
const petWalletFindMedicines = "/api/petpass/medicine/findAll";

const serviceStateUrl = "/api/petpass/service/status";

const contactRegisterNewsletterUrl = "/api/petpass/contact/registerForNewsletter";

const notesCreate = "/api/petpass/note/create";
const notesFind = "/api/petpass/note/find";

// --------------------------------------------------------------------------
console.log("pet wallet test suite start");
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
const buildHeader = (token) => {
    let headers = {
        'headers': {
            'token': token
        }
    }

    return headers;
}
// --------------------------------------------------------------------------
const createUser = async () => {

    let testCaseNickname = 'JohnDoe' + Math.random();
    testCaseNickname = testCaseNickname.substring(0, 20);

    // create user
    let response = await axios.post(serviceHost + userCreateUrl, { 'nickname': testCaseNickname });
    let createdUserToken = response.data.token;
    console.assert(createdUserToken != undefined, 'no user token created');

    // find user by created token
    response = await axios.post(serviceHost + userFindUrl, {}, buildHeader(createdUserToken));
    console.assert(response.data.nickname == testCaseNickname, 'user was not found by token');

    // udpate user token
    let updatedNickname = 'JohnDoeUpd' + Math.random();
    updatedNickname = updatedNickname.substring(0, 20);
    response = await axios.post(serviceHost + userUpdateUrl, { nickname: updatedNickname }, buildHeader(createdUserToken));

    // refetch user by token
    response = await axios.post(serviceHost + userFindUrl, {}, buildHeader(createdUserToken));
    console.assert(response.data.nickname == updatedNickname, 'user update did not work');

    return response.data.token;
}
// --------------------------------------------------------------------------
const createUserPets = async (userToken) => {

    console.log('manage pets for user with token ' + userToken);

    // initial ... create two cats
    let moritz = {
        'name': 'Moritz',
        'type': 'MainCon',
        'dateOfBirth': null,
        'avatarImage': 'XXXbase64'
    };

    let moritzResponseData = await axios.post(serviceHost + petCreateUrl, moritz, buildHeader(userToken));
    console.log('... create pet moritz response ' + JSON.stringify(moritzResponseData.data));


    moritzResponseData = await axios.post(serviceHost + petCreateUrl, moritz, buildHeader(userToken));
    console.log('... create pet moritz response ' + JSON.stringify(moritzResponseData.data));

    moritzResponseData = await axios.post(serviceHost + petCreateUrl, moritz, buildHeader(userToken));
    console.log('... create pet moritz response ' + JSON.stringify(moritzResponseData.data));
    moritzResponseData = await axios.post(serviceHost + petCreateUrl, moritz, buildHeader(userToken));
    console.log('... create pet moritz response ' + JSON.stringify(moritzResponseData.data));
    moritzResponseData = await axios.post(serviceHost + petCreateUrl, moritz, buildHeader(userToken));
    console.log('... create pet moritz response ' + JSON.stringify(moritzResponseData.data));
    

    console.assert(moritzResponseData.data.id != null, 'creation of pet did not work');
    console.log('created pet aramis ' + moritzResponseData.data.id, 'created pet assert');

    let aramis = {
        'name': 'Aramis',
        'type': 'MainCoon',
        'dateOfBirth': null,
        'avatarImage': 'XXX'
    };

    let aramisResponseData = await axios.post(serviceHost + petCreateUrl, aramis, buildHeader(userToken));
    console.assert(aramisResponseData.data.id != null, 'creation of pet did not work');
    console.log('created pet ' + aramisResponseData.data.id);

    // create a share for aramis
    let aramisShareResponseData = await axios.post(serviceHost + petShareCreateUrl, {
        'petId': aramisResponseData.data.id
    }, buildHeader(userToken));
    console.assert(aramisShareResponseData.data.shareTokenId != null, 'creation of aramis share token did not work');
    console.log('created pet aramis share token id ' + aramisShareResponseData.data.shareTokenId);

    // ++++++++ todo... test all update methods

    return 2;
}
// --------------------------------------------------------------------------
const findUserPets = async (userToken) => {

    console.log('find pets for user with token ' + userToken);

    let petData = await axios.post(serviceHost + petFindUrl, {}, buildHeader(userToken));

    console.log('num of existing pets ... for user ' + petData.data.pets.length)

    console.assert(petData.data.pets[0].name == "Moritz", 'Moritz not found');
    console.assert(petData.data.pets[1].name == "Aramis", 'Aramis not found');

    return petData.data.length;
}
// --------------------------------------------------------------------------
const createWalletEntriesForPet = async (userToken) => {

    console.log('create some wallet entries for moritz of user ' + userToken)

    let petData = await axios.post(serviceHost + petFindUrl, {}, buildHeader(userToken));
    console.assert(petData.data.pets[0].name == "Moritz", 'Moritz not found');

    // create first entry
    let entry = {
        'petId': petData.data.pets[0].id,
        'title': 'Leucogen',
        'description': 'xxx typo xxx Kleintierklinik Breitensee',
        'date': + new Date().getTime()
    };

    let entryResponseData = await axios.post(serviceHost + petWalletCreateUrl, entry, buildHeader(userToken));

    

    console.assert(entryResponseData.data.id != undefined, 'wallet entry created for moritz failed');
    console.log('wallet entry created for moritz with id ' + entryResponseData.data.id);

    // update first entry, fix typo
    entry.id = entryResponseData.data.id;
    entry.description = 'Kleintierklinik Breitensee';
    entryResponseData = await axios.post(serviceHost + petWalletUpdateUrl, entry, buildHeader(userToken));
    console.log('wallet entry updated for moritz');

    // create second entry
    entry = {
        'petId': petData.data.pets[0].id,
        'title': 'Primucell',
        'description': 'Kleintierklinik Breitensee, Dr. Seebauer',
        'date': + new Date().getTime()
    };

    entryResponseData = await axios.post(serviceHost + petWalletCreateUrl, entry, buildHeader(userToken));
    console.assert(entryResponseData.data.id != undefined, 'wallet entry created for moritz failed');
    console.log('wallet entry created for moritz');

    return 2;
}
// --------------------------------------------------------------------------
const fetchWalletEntriesForPet = async (userToken) => {

    console.log('create some wallet entries for moritz of user ' + userToken)

    let petData = await axios.post(serviceHost + petFindUrl, {}, buildHeader(userToken));
    console.assert(petData.data.pets[0].name == "Moritz", 'Moritz not found');

    let petWalletData = await axios.post(serviceHost + petWalletFindUrl, {
        'petId': petData.data.pets[0].id,
    }, buildHeader(userToken));

    console.assert(petWalletData.data.entries[0].title == 'Leucogen', 'fetchWallet 0');
    console.assert(petWalletData.data.entries[0].description == 'Kleintierklinik Breitensee', 'fetchWallet 1');
    console.assert(petWalletData.data.entries[1].title == 'Primucell', 'fetchWallet 2');

    return petWalletData.data.entries.length;
}
// --------------------------------------------------------------------------
function checkFileExistsSync(filepath) {
    let flag = true;
    try {
        fs.accessSync(filepath, fs.constants.F_OK);
    } catch (e) {
        flag = false;
    }
    return flag;
}
// --------------------------------------------------------------------------
const postMoritzAvatarImage = async (userToken) => {

    let petData = await axios.post(serviceHost + petFindUrl, {}, buildHeader(userToken));
    let moritz = petData.data.pets[0];
    console.assert(moritz.name == "Moritz", 'Moritz not found');
    console.assert(moritz.avatarImage == undefined, 'Moritz Avatar already existing');

    console.log('upload petpass image for moritz of user ' + userToken)
    let filePath = path.join(LOCAL_PATH_TEST_ASSETS, "profile_cat_01.jpg");
    let stats = fs.statSync(filePath);
    let avatarFilesize = stats.size;

    const avatarFileBase64 = 'data:image/jpg;base64,' + fs.readFileSync(filePath, {encoding: 'base64'});
    moritz.userId = undefined;
    moritz.created = undefined;
    moritz.dateOfBirth = null;
    moritz.avatarImage = avatarFileBase64;
    console.log('base64 of avatar image ' + avatarFileBase64.length);

    const afterAvatarUPloadResult = await axios.post(serviceHost + petUpdateUrl, moritz, buildHeader(userToken));
    console.log('after avatar upload ' + JSON.stringify(afterAvatarUPloadResult.data));
}
// --------------------------------------------------------------------------
const uploadCertificateForMoritz = async (userToken) => {

    let petData = await axios.post(serviceHost + petFindUrl, {}, buildHeader(userToken));

    let certFilePath = path.join(LOCAL_PATH_TEST_ASSETS, "pass01.jpg");
    const certFileBase64 = 'data:image/jpg;base64,' + fs.readFileSync(certFilePath, {encoding: 'base64'});
    //console.log(certFileBase64);
    let certProcessResult = await superagent.post(serviceHost + petWalletPostImageUrl)
        .set('token', userToken)
        .field('petId', petData.data.pets[0].id)
        .field('scan', certFileBase64);

    console.log(JSON.stringify(certProcessResult.text, null, 4));

    //let scanId = '6afa5b24-c2f4-48db-a832-93a1632f51eb';
    //console.log('delete scan now ... ' + scanId);

    /*await axios.post(serviceHost + petWalletDeleteScanUrl, {
        'id': scanId
    }, buildHeader(userToken));*/
}
// --------------------------------------------------------------------------
const testPetWalletFindMedicines = async (userToken) => {
	
	let medicineData = await axios.post(serviceHost + petWalletFindMedicines, {
    }, buildHeader(userToken));
	
	console.log(JSON.stringify(medicineData.data));
	
}

// --------------------------------------------------------------------------
const testPetWalletFindMedicine = async (userToken, medicineId) => {
	
	let medicineData = await axios.post(serviceHost + petWalletFindMedicineById, {
        'medicineId': medicineId,
    }, buildHeader(userToken));
	
	console.log(JSON.stringify(medicineData.data));
	
}
// --------------------------------------------------------------------------
const testFetchSharedData = async (shareId) => {
	
	let sharedData = await axios.post(serviceHost + petShareFindUrl, {
        'shareTokenId': shareId
    });
	
	console.log(JSON.stringify(sharedData.data));
	
}
// --------------------------------------------------------------------------
const testRegisterNewsletter = async () => {
	let sharedData = await axios.post(serviceHost + contactRegisterNewsletterUrl, {
        'email': 'john.doe@gmail.com',
        'text': 'XXX'
    });

    console.log(JSON.stringify(sharedData.data));
}
// --------------------------------------------------------------------------
const testUserDelete = async (userToken) => {

    let moritzResponseData = await axios.post(serviceHost + userDeleteUrl, {}, buildHeader(userToken));
}
// --------------------------------------------------------------------------
const testNotesCreate = async (petId, userToken) => {


    let notes = [];
    notes.push(
        {
            'title': 'a',
            'body': 'bla bla'
        }
    );
    notes.push(
        {
            'title': 'ab',
            'body': 'bla bla xxxx'
        }
    );

    let body = {
        'petId': petId,
        'notes': notes
    }

    let moritzResponseData = await axios.post(serviceHost + notesCreate, body, buildHeader(userToken));



    let responseData = await axios.post(serviceHost + notesFind, {
        'petId': petId
    }, buildHeader(userToken));

    console.log(JSON.stringify(responseData.data));

}
// --------------------------------------------------------------------------
// Basic Test Suite
// --------------------------------------------------------------------------


testNotesCreate('52a3eb1f-fe82-415c-95ba-4bef57a2e3f3', '4bd4159d-53c2-415b-bbcf-c23ad05983e3');


//testFetchSharedData('738834d1-4bd5-4a5f-9a39-fd64508045fd');
//testRegisterNewsletter();
//testUserDelete('ee638331-92e8-47df-b877-ea89f7b00b3c');
/*
const testPetDelete = async (userToken, petId) => {
    let response = await axios.post(serviceHost + petDeleteUrl, {
        'id': petId
    }, buildHeader(userToken));
}*/


//testPetDelete('0b2b8782-b9dd-4981-a944-60534d9f2527', '52a3eb1f-fe82-415c-95ba-4bef57a2e3f3');


/*
createUser().then((userToken) => {
    console.log(' go on with user token' + userToken);
    createUserPets(userToken).then((numberOfPetCreatedForUser) => {
        findUserPets(userToken).then((numberOfPetsForUser) => {
            console.assert(numberOfPetCreatedForUser == numberOfPetsForUser, 'not all created pets found');
            createWalletEntriesForPet(userToken).then((numberOfWalletEntriesForMoritz) => {
                fetchWalletEntriesForPet(userToken).then((numberOfFetchedWalletCardsForMoritz) => {
                    console.assert(numberOfFetchedWalletCardsForMoritz == numberOfWalletEntriesForMoritz, 'not all wallets found for moritz');
                    postMoritzAvatarImage(userToken).then(() => {
                        uploadCertificateForMoritz(userToken);
						//testPetWalletFindMedicine(userToken, '88855188-96ee-4b25-af46-533c351b318f');
						//testPetWalletFindMedicines(userToken);
                    })
                })
            })
        });
    });
});


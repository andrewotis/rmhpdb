export const transformedCredentials = data => {
    return data.map(d => {
        return { value: d.id, label: `${d.credential} - ${d.description}`};
    });
}

export const transformedCategories = data => {
    return data.map(d => {
        return { value: d.id, label: d.category };
    });
}

export const transformedSectors = data => {
    return data.map(d => {
        return { value: d.id, label: `${d.nora_sector_group} (NAICS: ${d.naics_code})`};
    });
}

export const userMetasToCredentials = (metas, transformedCredentials) => {
    const userCredIdsArr = metas.map(cred => parseInt(cred.value));
    return transformedCredentials.filter(cred => userCredIdsArr.includes(cred.value));
}

export const userMetasToCategories = (metas, transformedCategories) => {
    const userCatsIdsArr = metas.map(cat => parseInt(cat.value));
    return transformedCategories.filter(cat => userCatsIdsArr.includes(cat.value));
}

export const userMetasToSectors = (metas, transformedSectors) => {
    const userSctsIdsArr = metas.map(sec => parseInt(sec.value));
    return transformedSectors.filter(sec => userSctsIdsArr.includes(sec.value));
}

export const transformAdminSettings = adminSettings => {
    return adminSettings.filter(setting => setting.value == 'true').map(setting => setting.key);
}

export const userMetasToPrivacySettings = (metas, allowedAdminPrivacySettings) => {
    const userSettings = metas.map(meta => meta.key);
    let obj = {}
    allowedAdminPrivacySettings.map(setting => {
        obj[setting] = userSettings.includes(setting) ? true : false
    });
    return obj;
}

export const transformCredentialsForPreview = (userCredentials, credentials) => {
    let arr = [];
    userCredentials.map(userCred => {
        const c = credentials.find(credential => credential.id == userCred.value);
        arr.push(c.credential);
    });
    return arr.join(", ");
}

export const transformSectorsForPreview = (userSectors, sectors) => {
    let arr = [];
    userSectors.map(userSector => {
        const s = sectors.find(sector => sector.id == userSector.value);
        arr.push(s.naics_code);
    });
    return arr.join(", ");
}

export const transformCategoriesForPreview = (userCategories, categories) => {
    let arr = [];
    userCategories.map(userCategory => {
        const c = categories.find(category => category.id == userCategory.value);
        arr.push(c.category);
    });
    return arr.join(", ");
}
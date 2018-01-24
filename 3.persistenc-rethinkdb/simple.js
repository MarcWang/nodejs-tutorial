const config = {
    min: 50,
    max: 1000,
    timeoutError: 1000,
    timeoutGb: 60 * 60 * 1000,
    host: "localhost",
    port: 28015,
    authKey: "",
    db: "rethinkdb_demo"
};
const thinky = require('thinky')(config);

const AccountModel = thinky.createModel("Account", {
    id: thinky.type.string(),
    name: thinky.type.string(),
    description: thinky.type.string().default('no description'),
    age: thinky.type.number(),
    gender: thinky.type.number(),
    single: thinky.type.boolean(),
    nickname: thinky.type.string().default(function() {
        return this.name;
    })
});

thinky.dbReady().then(() => { console.log('ready') })

AccountModel.define("isMatch", function(account) {
    return (this.gender != account.gender) ? true : false;
});

AccountModel.changes()
    .execute()
    .then((feed) => {
        feed.each((error, doc) => {
            if (error) {
                console.log(error);
            } else {
                console.log('notify');
                console.log(doc);
            }
        });
    }).error((error) => {
        console.log(error);
    });


function get(id) {
    AccountModel.get(id)
        .then((result) => {
            console.log(result)
        }).error((error) => {
            console.log(error);
        });
}


function createDetails(account) {
    let acc = new AccountModel(account);
    acc.saveAll({ account: true })
        .then((result) => {
            console.log(result);
        }).error((error) => {
            console.log(error);
        });
}

function create(account) {
    let acc = new AccountModel(account);
    acc.save().then((result) => {
        console.log(result)
    }).error((error) => {
        console.log(error);
    });
}

function update(account) {
    let acc = new AccountModel(account);
    AccountModel.filter({ name: account.name })
        .update(acc)
        .execute()
        .then((result) => {
            let acc1 = new AccountModel({ name: 'Ingrid', gender: 0 });
            console.log(acc1.isMatch(result[0]));
        }).error((error) => {
            console.log(error);
        });
}

function del(account) {
    AccountModel.filter({ name: account.name })
        .delete()
        .execute()
        .then((result) => {
            console.log(result)
        }).error((error) => {
            console.log(error);
        });
}

function query(cb) {
    AccountModel.filter({})
        .execute()
        .then((result) => {
            // console.log(result);
            cb(null, result);
        }).error((error) => {
            console.log(error);
        });
}

// create({ name: 'Marc', age: 29, gender: 1  });
// update({ name: 'Marc', age: 29, gender: 1 });
// del({ name: 'Marc'});
query((err, accounts) => {
    accounts.forEach((account) => {
        console.log(`id: ${account.id}`);
        get(account.id);

    })
});

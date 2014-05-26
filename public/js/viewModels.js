var masterViewModel = function(standardClaims, additionalClaims) {

    var self = this;

    self.standardClaims = standardClaims;
    self.additionalClaims = ko.observableArray(additionalClaims);

    self.key = ko.observable("my key");
    self.createdJwt = ko.observable("");

    self.generatedClaimSet = ko.computed(function() {

        var iat = new Date(this.standardClaims.issuedAt()).getTime();
        var exp = new Date(this.standardClaims.expiration()).getTime();

        var claimSet =
            {
                iss : this.standardClaims.issuer(),
                iat : Math.floor(iat / 1000),
                exp : Math.floor(exp / 1000),
                aud : this.standardClaims.audience(),
                sub : this.standardClaims.subject()
            };

        var claims = this.additionalClaims();

        for(var i = 0; i < claims.length; i++) {
            var claimType = claims[i].claimType();
            var value = claims[i].value();

            if(!claimType || !value) continue;

            if(!claimSet[claimType]) {
                claimSet[claimType] = value;
            }
            else {
                var current = claimSet[claimType];
                if($.isArray(current)) {
                    current.push(value);
                }
                else {
                    var newArray = [];
                    newArray.push(current);
                    newArray.push(value);
                    claimSet[claimType] = newArray;
                }
            }
        }

        return claimSet;
    }, self);

    self.generatedClaimSetDisplay = ko.computed(function() {
        return JSON.stringify(this.generatedClaimSet(), null, 4);
    }, this);

    self.clearCreatedJwt = ko.computed(function() {
        self.generatedClaimSet();
        self.key();
        self.createdJwt("");
    }, self);

    self.issuedAtSetNow = function() {
        this.standardClaims.issuedAt(new Date().toISOString());
    };

    self.expirationSetNow = function() {
        this.standardClaims.expiration(new Date().toISOString());
    };

    self.expirationSetTwentyMinutes = function() {
        var now = new Date();
        var later = addMinutes(now, 20);
        this.standardClaims.expiration(later.toISOString());
    };

    self.expirationSetOneYear = function() {
        var now = new Date();
        var later = addMinutes(now, 365*24*60);
        this.standardClaims.expiration(later.toISOString());
    };

    self.clearAllAdditionalClaims = function() {
        while(this.additionalClaims().length > 0) {
            this.additionalClaims.pop();
        }
    };

    self.addOneAdditionalClaim = function() {
        this.additionalClaims.push(new claimViewModel("",""));
    };

    self.addEmailAdditionalClaim = function() {
        this.additionalClaims.push(new claimViewModel("Email","bee@example.com"));
    };

    self.addNameNetAdditionalClaim = function() {
        this.additionalClaims.push(new claimViewModel("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name","jrocket"));
    };

    self.addRoleNetAdditionalClaim = function() {
        this.additionalClaims.push(new claimViewModel("http://schemas.microsoft.com/ws/2008/06/identity/claims/role","Manager"));
    };

    self.addEmailNetAdditionalClaim = function() {
        this.additionalClaims.push(new claimViewModel("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email","bee@example.com"));
    };

    self.removeClaim = function(claim) {
        self.additionalClaims.remove(claim);
    };

    self.createJwt = function() {
        var request = {
          claims: this.generatedClaimSet(),
          key:this.key()
        };

        var data = ko.toJSON(request);

        $.ajax({
            type: 'POST',
            url: '/tokens',
            data: data,
            contentType: 'application/json;charset=utf8',
            success: self.onTokenSuccess,
            error: self.onTokenError
        });
    };

    self.onTokenSuccess = function(data, status) {
        self.createdJwt(data.token);
    };

    self.onTokenError = function(error) {
        self.createdJwt(error.responseText);
    };

    self.warnings = ko.computed(function() {
        var warnings = [];

        var dt = new Date(this.standardClaims.issuedAt());
        if (isNaN(dt)) {
            warnings.push("IssuedAt is not a valid <a href=\"http://www.w3.org/TR/NOTE-datetime\">W3C date/time</a>. Must be formatted as: YYYY-MM-DDThh:mm:ssZ");
        }

        dt = new Date(this.standardClaims.expiration());
        if (isNaN(dt)) {
            warnings.push("Expiration  is not a valid <a href=\"http://www.w3.org/TR/NOTE-datetime\">W3C date/time</a>. Must be formatted as: YYYY-MM-DDThh:mm:ssZ");
        }

        return warnings;
    }, self);
};


var standardClaimsViewModel = function(issuer, issuedAt, expiration, audience, subject) {

    var self = this;

    self.issuer = ko.observable(issuer);
    self.issuedAt = ko.observable(issuedAt);
    self.expiration = ko.observable(expiration);
    self.audience = ko.observable(audience);
    self.subject = ko.observable(subject);
};


var createMaster = function() {
    var standardClaims = new standardClaimsViewModel(
        "Online JWT Builder",
        "2014-07-14T08:30Z",
        "2014-07-16T19:20Z",
        "www.example.com",
        "jrocket@example.com"
    );

    var additionalClaims = [
        new claimViewModel("GivenName", "Johnny"),
        new claimViewModel("Surname", "Rocket"),
        new claimViewModel("Email", "jrocket@example.com"),
        new claimViewModel("Role", "Manager"),
        new claimViewModel("Role", "Project Administrator")];

    var master = new masterViewModel(standardClaims, additionalClaims);

    return master;
};

var claimViewModel = function(claimType, value) {
    var self = this;

    self.claimType = ko.observable(claimType);
    self.value = ko.observable(value);
};
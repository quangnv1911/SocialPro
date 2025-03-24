CREATE TABLE activity
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    type       VARCHAR(255) NOT NULL,
    ip         VARCHAR(255) NOT NULL,
    CONSTRAINT pk_activity PRIMARY KEY (id)
);

CREATE TABLE category
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1) NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    price DOUBLE NULL,
    CONSTRAINT pk_category PRIMARY KEY (id)
);

CREATE TABLE coupon
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    code       VARCHAR(255) NOT NULL,
    amount     INT          NOT NULL,
    used       INT          NOT NULL,
    discount   BIGINT       NOT NULL,
    CONSTRAINT pk_coupon PRIMARY KEY (id)
);

CREATE TABLE coupon_used
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1) NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    coupon_id  BINARY(16)   NOT NULL,
    user_id    BINARY(16)   NOT NULL,
    CONSTRAINT pk_coupon_used PRIMARY KEY (id)
);

CREATE TABLE discount
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1) NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    product_id BINARY(16)   NOT NULL,
    amount     INT    NOT NULL,
    discount   INT    NOT NULL,
    CONSTRAINT pk_discount PRIMARY KEY (id)
);

CREATE TABLE invalid_token
(
    id          BINARY(16)   NOT NULL,
    created_by  VARCHAR(255) NULL,
    updated_by  VARCHAR(255) NULL,
    created_at  datetime NULL,
    updated_at  datetime NULL,
    is_deleted  BIT(1)       NOT NULL,
    deleted_at  datetime NULL,
    deleted_by  VARCHAR(255) NULL,
    token_value VARCHAR(255) NOT NULL,
    expiry_time datetime     NOT NULL,
    CONSTRAINT pk_invalid_token PRIMARY KEY (id)
);

CREATE TABLE invoice
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1) NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    price DOUBLE NULL,
    CONSTRAINT pk_invoice PRIMARY KEY (id)
);

CREATE TABLE `order`
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1) NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    amount     BIGINT NOT NULL,
    CONSTRAINT pk_order PRIMARY KEY (id)
);

CREATE TABLE product
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1) NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    price DOUBLE NULL,
    CONSTRAINT pk_product PRIMARY KEY (id)
);

CREATE TABLE `role`
(
    id            BINARY(16)   NOT NULL,
    created_by    VARCHAR(255) NULL,
    updated_by    VARCHAR(255) NULL,
    created_at    datetime NULL,
    updated_at    datetime NULL,
    is_deleted    BIT(1)       NOT NULL,
    deleted_at    datetime NULL,
    deleted_by    VARCHAR(255) NULL,
    role_name     VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    CONSTRAINT pk_role PRIMARY KEY (id)
);

CREATE TABLE user
(
    id                   BINARY(16)   NOT NULL,
    created_by           VARCHAR(255) NULL,
    updated_by           VARCHAR(255) NULL,
    created_at           datetime NULL,
    updated_at           datetime NULL,
    is_deleted           BIT(1)       NOT NULL,
    deleted_at           datetime NULL,
    deleted_by           VARCHAR(255) NULL,
    email                VARCHAR(255) NOT NULL,
    password             VARCHAR(255) NOT NULL,
    name                 VARCHAR(255) NOT NULL,
    avatar               VARCHAR(255) NULL,
    money                BIGINT NULL,
    phone                VARCHAR(255) NULL,
    time_forgot_password VARCHAR(255) NULL,
    dob                  date NULL,
    ranking              VARCHAR(255) NULL,
    otp                  VARCHAR(255) NULL,
    otp_expiry_date      datetime NULL,
    enabled              BIT(1) NULL,
    role_id              BINARY(16)   NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE `withdraw-ref`
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime NULL,
    updated_at datetime NULL,
    is_deleted BIT(1) NOT NULL,
    deleted_at datetime NULL,
    deleted_by VARCHAR(255) NULL,
    price DOUBLE NULL,
    CONSTRAINT `pk_withdraw-ref` PRIMARY KEY (id)
);


ALTER TABLE user
    ADD CONSTRAINT uc_user_email UNIQUE (email);

ALTER TABLE coupon_used
    ADD CONSTRAINT FK_COUPON_USED_ON_COUPON FOREIGN KEY (coupon_id) REFERENCES coupon (id);

ALTER TABLE coupon_used
    ADD CONSTRAINT FK_COUPON_USED_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE discount
    ADD CONSTRAINT FK_DISCOUNT_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE user
    ADD CONSTRAINT FK_USER_ON_ROLE FOREIGN KEY (role_id) REFERENCES `role` (id);
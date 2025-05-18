CREATE TABLE activity
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime     NULL,
    updated_at datetime     NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime     NULL,
    deleted_by VARCHAR(255) NULL,
    type       VARCHAR(255) NOT NULL,
    ip         VARCHAR(255) NOT NULL,
    message    VARCHAR(255) NULL,
    CONSTRAINT pk_activity PRIMARY KEY (id)
);

CREATE TABLE category
(
    id            BINARY(16)   NOT NULL,
    created_by    VARCHAR(255) NULL,
    updated_by    VARCHAR(255) NULL,
    created_at    datetime     NULL,
    updated_at    datetime     NULL,
    is_deleted    BIT(1)       NOT NULL,
    deleted_at    datetime     NULL,
    deleted_by    VARCHAR(255) NULL,
    name          VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    image         VARCHAR(255) NULL,
    big_category  VARCHAR(255) NOT NULL,
    CONSTRAINT pk_category PRIMARY KEY (id)
);

CREATE TABLE coupon
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime     NULL,
    updated_at datetime     NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime     NULL,
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
    created_at datetime     NULL,
    updated_at datetime     NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime     NULL,
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
    created_at datetime     NULL,
    updated_at datetime     NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime     NULL,
    deleted_by VARCHAR(255) NULL,
    product_id BINARY(16)   NOT NULL,
    amount     INT          NOT NULL,
    discount   INT          NOT NULL,
    CONSTRAINT pk_discount PRIMARY KEY (id)
);

CREATE TABLE invalid_token
(
    id          VARCHAR(255) NOT NULL,
    expiry_time datetime     NULL,
    CONSTRAINT pk_invalid_token PRIMARY KEY (id)
);

CREATE TABLE invoice
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime     NULL,
    updated_at datetime     NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime     NULL,
    deleted_by VARCHAR(255) NULL,
    price      DOUBLE       NULL,
    CONSTRAINT pk_invoice PRIMARY KEY (id)
);

CREATE TABLE order_detail
(
    id              BINARY(16)   NOT NULL,
    created_by      VARCHAR(255) NULL,
    updated_by      VARCHAR(255) NULL,
    created_at      datetime     NULL,
    updated_at      datetime     NULL,
    is_deleted      BIT(1)       NOT NULL,
    deleted_at      datetime     NULL,
    deleted_by      VARCHAR(255) NULL,
    product_id      BINARY(16)   NULL,
    mmo_resource_id BINARY(16)   NULL,
    cronjob_key     VARCHAR(255) NULL,
    status          VARCHAR(255) NULL,
    category        VARCHAR(255) NOT NULL,
    quantity        INT          NOT NULL,
    duration        VARCHAR(255) NULL,
    order_id        BINARY(16)   NOT NULL,
    CONSTRAINT pk_order_detail PRIMARY KEY (id)
);

CREATE TABLE orders
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime     NULL,
    updated_at datetime     NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime     NULL,
    deleted_by VARCHAR(255) NULL,
    amount     DECIMAL      NOT NULL,
    user_id    BINARY(16)   NOT NULL,
    CONSTRAINT pk_orders PRIMARY KEY (id)
);

CREATE TABLE payment
(
    id             BIGINT         NOT NULL,
    created_by     VARCHAR(255)   NULL,
    updated_by     VARCHAR(255)   NULL,
    created_at     datetime       NULL,
    updated_at     datetime       NULL,
    is_deleted     BIT(1)         NOT NULL,
    deleted_at     datetime       NULL,
    deleted_by     VARCHAR(255)   NULL,
    amount         DECIMAL(19, 2) NOT NULL,
    gate           VARCHAR(255)   NULL,
    transaction_id VARCHAR(255)   NULL,
    content        VARCHAR(255)   NULL,
    balance_before DECIMAL        NULL,
    balance_after  DECIMAL        NULL,
    status         VARCHAR(255)   NULL,
    version        BIGINT         NULL,
    CONSTRAINT pk_payment PRIMARY KEY (id)
);

CREATE TABLE product
(
    id            BINARY(16)   NOT NULL,
    created_by    VARCHAR(255) NULL,
    updated_by    VARCHAR(255) NULL,
    created_at    datetime     NULL,
    updated_at    datetime     NULL,
    is_deleted    BIT(1)       NOT NULL,
    deleted_at    datetime     NULL,
    deleted_by    VARCHAR(255) NULL,
    name          VARCHAR(255) NOT NULL,
    price         DECIMAL      NOT NULL,
    image         VARCHAR(255) NULL,
    `description` TEXT         NULL,
    total_sold    INT          NULL,
    category_id   BINARY(16)   NULL,
    CONSTRAINT pk_product PRIMARY KEY (id)
);

CREATE TABLE product_detail
(
    id              BINARY(16)   NOT NULL,
    created_by      VARCHAR(255) NULL,
    updated_by      VARCHAR(255) NULL,
    created_at      datetime     NULL,
    updated_at      datetime     NULL,
    is_deleted      BIT(1)       NOT NULL,
    deleted_at      datetime     NULL,
    deleted_by      VARCHAR(255) NULL,
    data            VARCHAR(255) NULL,
    duration        VARCHAR(255) NULL,
    status          VARCHAR(255) NULL,
    product_id      BINARY(16)   NOT NULL,
    user_id         BINARY(16)   NOT NULL,
    order_detail_id BINARY(16)   NULL,
    CONSTRAINT pk_product_detail PRIMARY KEY (id)
);

CREATE TABLE product_duration
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime     NULL,
    updated_at datetime     NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime     NULL,
    deleted_by VARCHAR(255) NULL,
    duration   VARCHAR(255) NOT NULL,
    price      DECIMAL      NULL,
    product_id BINARY(16)   NOT NULL,
    CONSTRAINT pk_product_duration PRIMARY KEY (id)
);

CREATE TABLE `role`
(
    id            BINARY(16)   NOT NULL,
    created_by    VARCHAR(255) NULL,
    updated_by    VARCHAR(255) NULL,
    created_at    datetime     NULL,
    updated_at    datetime     NULL,
    is_deleted    BIT(1)       NOT NULL,
    deleted_at    datetime     NULL,
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
    created_at           datetime     NULL,
    updated_at           datetime     NULL,
    is_deleted           BIT(1)       NOT NULL,
    deleted_at           datetime     NULL,
    deleted_by           VARCHAR(255) NULL,
    email                VARCHAR(255) NOT NULL,
    password             VARCHAR(255) NOT NULL,
    name                 VARCHAR(255) NOT NULL,
    avatar               VARCHAR(255) NULL,
    money                DECIMAL      NULL,
    phone                VARCHAR(255) NULL,
    time_forgot_password VARCHAR(255) NULL,
    dob                  date         NULL,
    ranking              VARCHAR(255) NULL,
    otp                  VARCHAR(255) NULL,
    otp_expiry_date      datetime     NULL,
    enabled              BIT(1)       NULL,
    api_key              VARCHAR(255) NULL,
    role_id              BINARY(16)   NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE user_product_details
(
    user_id            BINARY(16) NOT NULL,
    product_details_id BINARY(16) NOT NULL,
    CONSTRAINT pk_user_productdetails PRIMARY KEY (user_id, product_details_id)
);

CREATE TABLE `withdraw-ref`
(
    id         BINARY(16)   NOT NULL,
    created_by VARCHAR(255) NULL,
    updated_by VARCHAR(255) NULL,
    created_at datetime     NULL,
    updated_at datetime     NULL,
    is_deleted BIT(1)       NOT NULL,
    deleted_at datetime     NULL,
    deleted_by VARCHAR(255) NULL,
    price      DOUBLE       NULL,
    CONSTRAINT `pk_withdraw-ref` PRIMARY KEY (id)
);

ALTER TABLE user
    ADD CONSTRAINT uc_user_email UNIQUE (email);

ALTER TABLE user_product_details
    ADD CONSTRAINT uc_user_product_details_productdetails UNIQUE (product_details_id);

ALTER TABLE coupon_used
    ADD CONSTRAINT FK_COUPON_USED_ON_COUPON FOREIGN KEY (coupon_id) REFERENCES coupon (id);

ALTER TABLE coupon_used
    ADD CONSTRAINT FK_COUPON_USED_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE discount
    ADD CONSTRAINT FK_DISCOUNT_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE order_detail
    ADD CONSTRAINT FK_ORDER_DETAIL_ON_ORDER FOREIGN KEY (order_id) REFERENCES orders (id);

ALTER TABLE product_detail
    ADD CONSTRAINT FK_PRODUCT_DETAIL_ON_ORDER_DETAIL FOREIGN KEY (order_detail_id) REFERENCES order_detail (id);

ALTER TABLE product_detail
    ADD CONSTRAINT FK_PRODUCT_DETAIL_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE product_detail
    ADD CONSTRAINT FK_PRODUCT_DETAIL_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE product_duration
    ADD CONSTRAINT FK_PRODUCT_DURATION_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE product
    ADD CONSTRAINT FK_PRODUCT_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES category (id);

ALTER TABLE user
    ADD CONSTRAINT FK_USER_ON_ROLE FOREIGN KEY (role_id) REFERENCES `role` (id);

ALTER TABLE user_product_details
    ADD CONSTRAINT fk_useprodet_on_product_detail FOREIGN KEY (product_details_id) REFERENCES product_detail (id);

ALTER TABLE user_product_details
    ADD CONSTRAINT fk_useprodet_on_user FOREIGN KEY (user_id) REFERENCES user (id);
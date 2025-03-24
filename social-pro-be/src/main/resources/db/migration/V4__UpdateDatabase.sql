CREATE TABLE IF NOT EXISTS SocialPro.payment_history
(
    id             BIGINT         NOT NULL,
    created_by     VARCHAR(255) NULL,
    updated_by     VARCHAR(255) NULL,
    created_at     datetime NULL,
    updated_at     datetime NULL,
    is_deleted     BIT(1)         NOT NULL,
    deleted_at     datetime NULL,
    deleted_by     VARCHAR(255) NULL,
    amount         DECIMAL(19, 2) NOT NULL,
    message        VARCHAR(255) NULL,
    balance_before DECIMAL NULL,
    CONSTRAINT pk_payment_history PRIMARY KEY (id)
);

ALTER TABLE SocialPro.category
    ADD big_category VARCHAR(255) NULL;

ALTER TABLE SocialPro.category
    ADD category_description VARCHAR(255) NULL;

ALTER TABLE SocialPro.category
    ADD category_image VARCHAR(255) NULL;

ALTER TABLE SocialPro.category
    ADD category_name VARCHAR(255) NULL;

ALTER TABLE SocialPro.category
    MODIFY big_category VARCHAR (255) NOT NULL;


ALTER TABLE SocialPro.category
DROP
COLUMN price;
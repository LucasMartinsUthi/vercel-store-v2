# Import environment configuration
include .env
export $(shell sed 's/=.*//' .env)
SHELL := bash

# =================================================================
# GITLAB STORE V2 MAKEFILE
# =================================================================

# -----------------------------------------------------------------
# LOGGING CONFIGURATION
# -----------------------------------------------------------------

# Color definitions
COLOR_RESET   := \033[0m
COLOR_BOLD    := \033[1m
COLOR_RED     := \033[31m
COLOR_GREEN   := \033[32m
COLOR_YELLOW  := \033[33m
COLOR_BLUE    := \033[34m
COLOR_MAGENTA := \033[35m
COLOR_CYAN    := \033[36m
COLOR_WHITE   := \033[37m

# Logging macros - simplified and robust
define log_info
echo -e "$(COLOR_BLUE)[INFO]$(COLOR_RESET) $(1)"
endef

define log_success
echo -e "$(COLOR_GREEN)[SUCCESS]$(COLOR_RESET) $(1)"
endef

define log_warning
echo -e "$(COLOR_YELLOW)[WARNING]$(COLOR_RESET) $(1)"
endef

define log_error
echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) $(1)"
endef

define log_step
echo -e "$(COLOR_CYAN)[STEP $(1)/$(2)]$(COLOR_RESET) $(3)"
endef

define log_separator
echo -e "$(COLOR_BOLD)=================================================================$(COLOR_RESET)"
endef

define log_header
@$(call log_separator)
echo -e "$(COLOR_BOLD)$(COLOR_CYAN)$(1)$(COLOR_RESET)"
@$(call log_separator)
endef

define log_section
echo -e "$(COLOR_BOLD)$(COLOR_MAGENTA)$(1)$(COLOR_RESET)"
echo -e "$(COLOR_MAGENTA)-----------------------------------------------------------------$(COLOR_RESET)"
endef

# -----------------------------------------------------------------
# PROJECT STRUCTURE CONFIGURATION
# -----------------------------------------------------------------

# Core directories
MODULE_ROOT_DIR  := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
MODULE_PATH      ?= $(MODULE_ROOT_DIR)
DEPLOYMENTS_PATH ?= $(MODULE_PATH)/deployments

# -----------------------------------------------------------------
# HELP AND DOCUMENTATION
# -----------------------------------------------------------------

help: ## Display available make targets with descriptions
	@echo ""
	@$(call log_separator)
	@echo -e "$(COLOR_BOLD)$(COLOR_CYAN)GITLAB STORE V2 - Available Make Targets$(COLOR_RESET)"
	@$(call log_separator)
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "$(COLOR_CYAN)%-30s$(COLOR_RESET) %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@$(call log_section,QUICK COMMANDS:)
	@echo -e "  $(COLOR_GREEN)make all$(COLOR_RESET)                - Complete deployment of gitlab-store-v2"
	@echo ""
	@$(call log_section,STEP-BY-STEP DEPLOYMENT COMMANDS:)
	@echo -e "  ${COLOR_GREEN}make image$(COLOR_RESET)              - Build Docker image"
	@echo -e "  ${COLOR_GREEN}make push$(COLOR_RESET)               - Push Docker image to remote repository"
	@echo -e "  ${COLOR_GREEN}make deploy$(COLOR_RESET)             - Deploy Gitlab Store V2"
	@echo -e "  ${COLOR_GREEN}make cname$(COLOR_RESET)              - Update CNAME records"


# -----------------------------------------------------------------
# VALIDATION AND ENVIRONMENT CHECK
# -----------------------------------------------------------------

validate-environment: ## Validate environment configuration and required variables
	@$(call log_header,Environment Validation)
	@$(call log_info,Validating environment configuration...)
	@$(call log_info,Validating required variables...)
	@test -n "$(APP_NAME)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) APP_NAME is not set"; exit 1; }
	@test -n "$(IMAGE_TAG)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) IMAGE_TAG is not set"; exit 1; }
	@test -n "$(NAMESPACE)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) NAMESPACE is not set"; exit 1; }
	@test -n "$(BFF_APP_NAME)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) BFF_APP_NAME is not set"; exit 1; }
	@test -n "$(DOMAIN_NAME)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) DOMAIN_NAME is not set"; exit 1; }
	@test -n "$(CLUSTER_NAME)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) CLUSTER_NAME is not set"; exit 1; }
	@test -n "$(ECR_REGISTRY)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) ECR_REGISTRY is not set"; exit 1; }
	@test -n "$(AWS_PROFILE)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) AWS_PROFILE is not set"; exit 1; }
	@test -n "$(AWS_REGION)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) AWS_REGION is not set"; exit 1; }
	@test -n "$(HOSTED_ZONE_ID)" || { echo -e "$(COLOR_RED)[ERROR]$(COLOR_RESET) HOSTED_ZONE_ID is not set"; exit 1; }
	@$(call log_success,Environment validation completed successfully)

show-config: ## Display current configuration values from environment
	@$(call log_header,CURRENT CONFIGURATION)
	@$(call log_section,Environment Configuration:)
	@echo -e "  App Name:       $(COLOR_CYAN)$(APP_NAME)$(COLOR_RESET)"
	@echo -e "  Image Tag:      $(COLOR_CYAN)$(IMAGE_TAG)$(COLOR_RESET)"
	@echo -e "  Namespace:      $(COLOR_CYAN)$(NAMESPACE)$(COLOR_RESET)"
	@echo -e "  BFF App Name:   $(COLOR_CYAN)$(BFF_APP_NAME)$(COLOR_RESET)"
	@echo -e "  Domain Name:    $(COLOR_CYAN)$(DOMAIN_NAME)$(COLOR_RESET)"
	@echo -e "  Cluster Name:   $(COLOR_CYAN)$(CLUSTER_NAME)$(COLOR_RESET)"
	@echo -e "  ECR Registry:   $(COLOR_CYAN)$(ECR_REGISTRY)$(COLOR_RESET)"
	@echo -e "  AWS Profile:    $(COLOR_CYAN)$(AWS_PROFILE)$(COLOR_RESET)"
	@echo -e "  AWS Region:     $(COLOR_CYAN)$(AWS_REGION)$(COLOR_RESET)"
	@echo -e "  Hosted Zone ID: $(COLOR_CYAN)$(HOSTED_ZONE_ID)$(COLOR_RESET)"
	@$(call log_separator)

# -----------------------------------------------------------------
# CONTAINER IMAGES MANAGEMENT
# -----------------------------------------------------------------

image: ## Build Docker image
	@$(call log_operation,Building Docker image $(APP_NAME):$(IMAGE_TAG))
	@if ! docker build --platform linux/amd64 -t $(APP_NAME):$(IMAGE_TAG) .; then \
		$(call log_error,Failed to build Docker container image); \
		exit 1; \
	fi
	@$(call log_success,Docker image builded successfully)

push: ## Push Docker image to ECR
	@$(call log_operation,Pushing image $(APP_NAME):$(IMAGE_TAG) to $(ECR_REGISTRY))
	@if ! docker tag $(APP_NAME):$(IMAGE_TAG) $(ECR_REGISTRY)/$(APP_NAME):$(IMAGE_TAG); then \
		$(call log_error,Failed to tag image); \
		exit 1; \
	fi
	@if ! aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(ECR_REGISTRY); then \
		$(call log_error,Failed to login to ECR); \
		exit 1; \
	fi
	@if ! docker push $(ECR_REGISTRY)/$(APP_NAME):$(IMAGE_TAG); then \
		$(call log_error,Failed to push image to ECR); \
		exit 1; \
	fi
	@$(call log_success,Docker image pushed successfully)

# -----------------------------------------------------------------
# APPLICATION MANAGEMENT
# -----------------------------------------------------------------

kubeconfig: ## Update Kubeconfig
	@$(call log_operation,Getting Kubeconfig for $(CLUSTER_NAME))
	@if ! aws eks update-kubeconfig --name $(CLUSTER_NAME) --region $(AWS_REGION) --profile $(AWS_PROFILE); then \
		$(call log_error,Failed to update Kubeconfig); \
		exit 1; \
	fi
	@$(call log_success,Kubeconfig updated successfully)

deploy: ## Deploy application to Kubernetes
	@$(call log_operation,Deploying $(APP_NAME))
	@if ! envsubst < $(DEPLOYMENTS_PATH)/deployment.yaml | kubectl -n $(NAMESPACE) apply -f - ; then \
		$(call log_error,Failed to apply deployment); \
		exit 1; \
	fi
	@if ! envsubst < $(DEPLOYMENTS_PATH)/service.yaml | kubectl -n $(NAMESPACE) apply -f - ; then \
		$(call log_error,Failed to apply service); \
		exit 1; \
	fi
	@if ! envsubst < $(DEPLOYMENTS_PATH)/ingress.yaml | kubectl -n $(NAMESPACE) apply -f - ; then \
		$(call log_error,Failed to apply ingress); \
		exit 1; \
	fi
	@sleep 10
	@$(call log_success,Application deployed successfully)

cname: ## Update CNAME
	@$(call log_operation,Updating CNAME record for $(APP_NAME))
	@TARGET_DOMAIN=$$(kubectl get ingress -n $(NAMESPACE) $(APP_NAME) -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'); \
		export TARGET_DOMAIN=$$TARGET_DOMAIN; \
		if ! aws route53 change-resource-record-sets --hosted-zone-id $(HOSTED_ZONE_ID) --change-batch file://<(envsubst < $(DEPLOYMENTS_PATH)/cname.json); then \
			$(call log_error,Failed to update CNAME); \
			exit 1; \
		fi
	@$(call log_success,CNAME record updated successfully)

# -----------------------------------------------------------------
# MAIN WORKFLOW
# -----------------------------------------------------------------

all: validate-environment image push deploy cname
	@$(call log_header,GITLAB STORE V2 DEPLOYMENT COMPLETE!)

# -----------------------------------------------------------------
# PHONY DECLARATIONS
# -----------------------------------------------------------------

.PHONY: help validate-environment show-config
.PHONY: image push deploy cname all

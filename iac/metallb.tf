resource "helm_release" "metallb" {
  chart            = "metallb"
  name             = "metallb"
  repository       = "https://metallb.github.io/metallb"
  namespace        = "metallb-system"
  create_namespace = "true"
  version          = "0.13.7"

  #values = [
  #file("../modules/metallb/values.yaml")
  #]

  depends_on = [
    helm_release.cilium
  ]
}

#resource "null_resource" "waiting_for_metallb_crds" {
#provisioner "local-exec" {
#command = <<-EOT
#kubectl wait --namespace metallb-system \
#--for=condition=ready pod \
#--selector=app=metallb \
#--timeout=90s
#EOT
#}
#depends_on = [
#helm_release.metallb
#]
#}

#data "template_file" "metallb_crd" {
#template = file("../modules/metallb/metallb-native.yaml")
#}

data "template_file" "metallb_config" {
  template = file("../modules/metallb/metallb-config.yaml")
}

locals {
  #resources_metallb_crds   = split("\n---\n", data.template_file.metallb_crd.rendered)
  resources_metallb_config = split("\n---\n", data.template_file.metallb_config.rendered)
}

#resource "k8s_manifest" "metallb_crds" {
#count = length(local.resources_metallb_crds)
#
#content   = local.resources_metallb_crds[count.index]
#namespace = "metallb-system"
#
#depends_on = [
#helm_release.metallb
#]
#}

resource "k8s_manifest" "metallb_config" {
  count = length(local.resources_metallb_config)

  content   = local.resources_metallb_config[count.index]
  namespace = helm_release.metallb.namespace

}

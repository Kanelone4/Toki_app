import  React from "react"

export default function ProfilePage() {
    return (
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Profile"
                  className="rounded-circle mb-3"
                  width={100}
                  height={100}
                />
                <h2>Votre Nom</h2>
                <p className="text-muted">@username</p>
              </div>
  
              <div className="d-flex justify-content-center mb-4">
                <div className="px-3 text-center">
                  <h5>254</h5>
                  <small className="text-muted">Posts</small>
                </div>
                <div className="px-3 text-center">
                  <h5>142</h5>
                  <small className="text-muted">Abonnés</small>
                </div>
                <div className="px-3 text-center">
                  <h5>86</h5>
                  <small className="text-muted">Abonnements</small>
                </div>
              </div>
  
              <p className="mb-4">
                Bienvenue sur Toki talk! Une application de réseau social interactif et divertissante ou chacun est libre de dire ce qu'il veut
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  